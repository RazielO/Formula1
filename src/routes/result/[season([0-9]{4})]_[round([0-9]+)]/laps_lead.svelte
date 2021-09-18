<script context="module">
    export function preload({ params }) {
        const data = { season: params.season, round: params.round - 1 };

        return { data };
    }
</script>

<script>
    import Loader from "../../../components/Loader.svelte";

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import { rounds, drivers } from "../../../stores.js";

    export let data;
    let size = 20;

    let season = data.season;
    let round = data.round;

    const groupLead = (laps) => {
        let result = [];
        let count = 1;
        let start = 1;
        let previous = laps[0];

        for (let i = 1; i < laps.length; i++) {
            if (previous === laps[i]) {
                count += 1;
            } else {
                result.push({
                    start: start,
                    end: i,
                    driver: previous,
                    count: count,
                    color: Object.values($drivers).filter(
                        (d) => d.name === previous
                    )[0].color,
                });
                start = i;
                previous = laps[i];
                count = 1;
            }
        }

        if (count !== 0) {
            result.push({
                start: start,
                end: laps.length,
                driver: previous,
                count: count,
                color: Object.values($drivers).filter(
                    (d) => d.name === previous
                )[0].color,
            });
        }

        return result;
    };

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

    onMount(() => {
        getLaps();
    });
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round] !== undefined}
        {#if $rounds[season][round].laps === undefined}
            <Loader />
        {:else if $rounds[season][round].laps !== undefined}
            <h1>{season} {$rounds[season][round].name}</h1>
            {#if $rounds[season][round]}
                <h2>Laps Lead</h2>

                <div class="laps" style="height: {size}rem;">
                    {#each groupLead($rounds[season][round].laps
                            .map((lap) => lap.map((o) => o.name))
                            .map((lap) => lap.filter((_, i) => i === 0))
                            .map((x) => x[0])) as group}
                        <div class="lead">
                            <div
                                style="background-color: {group.color}; height: {(group.count *
                                    size) /
                                    $rounds[season][round].laps.length}rem"
                            />
                            <span
                                style="line-height: {(group.count * size) /
                                    $rounds[season][round].laps.length}rem"
                                >{group.driver} (Laps {group.start} - {group.end})</span
                            >
                        </div>
                    {/each}
                </div>
            {:else}
                <h2>There is no information for this race</h2>
            {/if}
        {:else}
            <Loader />
        {/if}
    {/if}
{/if}

<style>
    .lead {
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1rem 15rem;
        width: max-content;
        grid-gap: 1rem;
        text-align: left;
    }

    .lead > div {
        height: 1rem;
        width: 1rem;
    }
</style>
