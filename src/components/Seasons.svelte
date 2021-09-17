<script>
    import Loader from "./Loader.svelte";

    import { startSeason, rounds } from "../stores";
    import { onMount } from "svelte";

    export let seasonSelected = 2000;

    let lastSeason;

    const getRounds = async () => {
        let url = `https://ergast.com/api/f1/${seasonSelected}.json`;

        if ($rounds[seasonSelected] === undefined) {
            let response = await fetch(url).then((data) => data.json());
            rounds.update((val) => {
                val[seasonSelected] = response.MRData.RaceTable.Races.map(
                    (race) => {
                        return {
                            round: race.round,
                            name: race.raceName,
                            circuit: race.Circuit.circuitName,
                            location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
                        };
                    }
                );
                return val;
            });
        }
    };

    onMount(async () => {
        lastSeason = new Date().getFullYear();
        seasonSelected = lastSeason

        if ($startSeason === undefined) {
            let response = await fetch(
                "https://ergast.com/api/f1/seasons.json?limit=1"
            ).then((data) => data.json());
            startSeason.update(() =>
                parseInt(response.MRData.SeasonTable.Seasons[0].season)
            );
        }

        getRounds();
    });
</script>

{#if lastSeason !== undefined && $startSeason !== undefined}
    <select
        name="season"
        id="season"
        bind:value={seasonSelected}
        on:change={getRounds}
    >
        {#each Array.from(new Array(lastSeason + 1 - $startSeason), (x, i) => i + $startSeason).reverse() as season}
            <option value={season}>{season}</option>
        {/each}
    </select>
{:else}
    <Loader size="1.5" units="rem" />
{/if}

<style>
    #season {
        margin: 1rem 0.5rem;
        background: no-repeat;
        border: none;
        cursor: pointer;
        font-weight: 300;
        font-size: 1rem;
    }
</style>
