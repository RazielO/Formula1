<script>
    import Loader from "./Loader.svelte";

    import { startSeason, rounds, seasonSelected } from "../stores";
    import { onMount } from "svelte";

    let lastSeason;

    onMount(async () => {
        lastSeason = new Date().getFullYear();
        seasonSelected.set(lastSeason);

        if ($startSeason === undefined) {
            let response = await fetch(
                "https://ergast.com/api/f1/seasons.json?limit=1"
            ).then((data) => data.json());
            startSeason.update(() =>
                parseInt(response.MRData.SeasonTable.Seasons[0].season)
            );
        }
    });
</script>

{#if lastSeason !== undefined && $startSeason !== undefined}
    <select
        name="season"
        id="season"
        bind:value={$seasonSelected}
        on:change={() => seasonSelected.set($seasonSelected)}
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
