<script context="module">
    export function preload({ params }) {
        const data = { season: params.season, round: params.round - 1 };

        return { data };
    }
</script>

<script>
    import { Canvas, Layer } from "svelte-canvas";
    import Chart from "chart.js/auto";

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import Loader from "../../../components/Loader.svelte";

    import { rounds, drivers } from "../../../stores.js";

    export let data;

    let season = data.season;
    let round = data.round;

    let minLap;
    let prevMin;
    let maxLap;
    let prevMax;
    let chart;

    const getLaps = async () => {
        let lapsUrl = `https://ergast.com/api/f1/${season}/${
            round + 1
        }/laps.json?limit=10000`;

        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            if (!Object.keys($rounds[season][round]).includes("laps")) {
                let response = await fetch(lapsUrl).then((data) => data.json());

                if (response.MRData.RaceTable.Races.length > 0) {
                    let laps = response.MRData.RaceTable.Races[0].Laps;
                    let lapsParsed = laps.map((lap) =>
                        lap.Timings.map((time) => {
                            return {
                                name: $drivers[time.driverId].name,
                                code: $drivers[time.driverId].code,
                                color: $drivers[time.driverId].color,
                            };
                        })
                    );

                    rounds.update((val) => {
                        val[season][round].laps = lapsParsed;
                        return val;
                    });
                } else {
                    rounds.update((val) => {
                        val[season][round].laps = [];
                        return val;
                    });
                }
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
            return {
                label: d,
                data: groups[d].filter(
                    (_, i) => i >= minLap - 1 && i <= maxLap - 1
                ),
                backgroundColor: color,
                borderColor: color,
            };
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
            },
        });
    };

    onMount(async () => {
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

            <Canvas width={640} height={300}>
                <Layer {setup} {render} />
            </Canvas>
        {:else}
            <Loader />
        {/if}
    {:else}
        <Loader />
    {/if}
{:else}
    <Loader />
{/if}
