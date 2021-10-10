<script context="module">
    export function preload({ params }) {
        const data = {
            season: params.season,
            round: params.round - 1,
            roundApi: params.round,
        };

        return { data };
    }
</script>

<script>
    import { Canvas, Layer } from "svelte-canvas";
    import Chart from "chart.js/auto";

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import Loader from "../../components/Loader.svelte";

    import { rounds, drivers } from "../../stores.js";
    import * as consumer from "../../api_consumer/consumer.js";
    import { GraphData } from "../../api_consumer/types/GraphData.js";

    export let data;

    let season = data.season;
    let round = data.round;
    let roundApi = data.roundApi;

    let minLap;
    let prevMin;
    let maxLap;
    let prevMax;
    let chart;
    let canvasHeight = 400;

    const getLaps = async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            let driversData = await consumer.getDrivers(season);
            Object.keys(driversData).map((driver) => {
                if ($drivers[driver] === undefined) {
                    drivers.update((value) => {
                        value[driver] = driversData[driver];
                        return value;
                    });
                }
            });

            if (!Object.keys($rounds[season][round]).includes("laps")) {
                let result = await consumer.getLaps(season, roundApi, $drivers);

                rounds.update((value) => {
                    value[season][round].laps = result;
                    return value;
                });
            }
        }
    };

    const groupLaps = (laps) => {
        laps = laps.map((lap) => lap.map((o) => o.code));
        let result = {};

        for (let i = 0; i < laps.length; i++) {
            for (let j = 0; j < laps[i].length; j++) {
                if (result[laps[i][j]] === undefined) {
                    result[laps[i][j]] = [j + 1];
                } else {
                    result[laps[i][j]].push(j + 1);
                }
            }
        }

        return result;
    };

    const parseLaps = (laps) => {
        let groups = groupLaps(laps);
        let driverCodes = Object.keys($drivers).map((driver) => {
            return {
                code: $drivers[driver].code,
                color: $drivers[driver].color,
            };
        });

        return Object.keys(groups).map((d) => {
            let color = driverCodes.filter((a) => a.code === d)[0].color;
            let data = groups[d].filter(
                (_, i) => i >= minLap - 1 && i <= maxLap - 1
            );

            return new GraphData(d, data, color);
        });
    };

    $: render = ({ context, width, height }) => {
        if (prevMax !== maxLap || prevMin !== minLap) {
            if (maxLap >= minLap) {
                chart.data = {
                    labels: new Array(maxLap - minLap + 1)
                        .fill(0)
                        .map((_, i) => i + minLap),
                    datasets: parseLaps($rounds[season][round].laps),
                };

                chart.update();
            }
        }

        prevMax = maxLap;
        prevMin = minLap;
    };

    const setup = ({ context, width, height }) => {
        if (minLap === undefined) {
            minLap = 1;
        }
        if (maxLap === undefined && $rounds[season] !== undefined) {
            maxLap = $rounds[season][round].laps.length;
        }

        chart = new Chart(context, {
            type: "line",
            data: {
                labels: new Array($rounds[season][round].laps.length)
                    .fill(0)
                    .map((_, i) => i + 1),
                datasets: parseLaps($rounds[season][round].laps),
            },
            options: {
                maintainAspectRatio: false,
                onResize: (chart, size) => {
                    if (size.width < 400) {
                        canvasHeight = 400;
                        maxLap = minLap + 5;
                    } else if (size.width < 600) {
                        maxLap = minLap + 10;
                    } else {
                        canvasHeight = 400;
                    }
                    chart.canvas.parentNode.style.height = `${canvasHeight}px`;
                    chart.height = canvasHeight;
                },
                scales: {
                    x: {
                        beginAtZero: false,
                    },
                    y: {
                        beginAtZero: false,
                        reverse: true,
                        min: 1,
                        max: $rounds[season][round].result.drivers.length,
                        offset: true,
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Lap ${context.label}`;
                            },
                            title: (context) => {
                                let code = context[0].dataset.label;
                                let key = Object.keys($drivers).filter(
                                    (k) => $drivers[k].code === code
                                )[0];
                                return $drivers[key].name;
                            },
                            footer: (context) => {
                                return `Position: ${context[0].formattedValue}`;
                            },
                        },
                    },
                },
            },
        });
    };

    onMount(async () => {
        if (!Object.keys($rounds[season][round]).includes("result")) {
            let result = await consumer.getResult(season, roundApi);

            rounds.update((value) => {
                value[season][round].result = result;
                return value;
            });
        }

        await getLaps();

        if (minLap === undefined) {
            minLap = 1;
        }
        if (maxLap === undefined && $rounds[season] !== undefined) {
            maxLap = $rounds[season][round].laps.length;
        }
    });
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round] !== undefined}
        {#if $rounds[season][round].laps !== undefined}
            <h1>{season} {$rounds[season][round].name}</h1>
            <h2>Positions during the race</h2>
            <h3>Click on any label to hide that driver</h3>

            <p>
                Show laps from <input
                    type="number"
                    bind:value={minLap}
                    min="1"
                    max={$rounds[season][round].laps.length}
                />
                to
                <input
                    type="number"
                    bind:value={maxLap}
                    min="1"
                    max={$rounds[season][round].laps.length}
                />
            </p>

            <div>
                <Canvas>
                    <Layer {setup} {render} />
                </Canvas>
            </div>
        {:else}
            <Loader />
        {/if}
    {:else}
        <Loader />
    {/if}
{:else}
    <Loader />
{/if}

<style>
    input[type="number"] {
        border: none;
        border-bottom-color: currentcolor;
        border-bottom-style: none;
        border-bottom-width: medium;
        border-bottom: 1px solid black;
        width: 5rem;
        font-size: 1rem;
        text-align: center;
    }
</style>
