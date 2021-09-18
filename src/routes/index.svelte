<script>
    import { onMount } from "svelte";

    import Loader from "../components/Loader.svelte";

    import { rounds, seasonSelected } from "../stores.js";

    const getRounds = async () => {
        let url = `https://ergast.com/api/f1/${$seasonSelected}.json`;

        if (
            $seasonSelected !== undefined &&
            ($rounds[$seasonSelected] === undefined ||
                $rounds[$seasonSelected].length === 0)
        ) {
            let response = await fetch(url).then((data) => data.json());
            rounds.update((val) => {
                val[$seasonSelected] = response.MRData.RaceTable.Races.map(
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

    onMount(() => {
        seasonSelected.subscribe(() => {
            getRounds();
        });
    });
</script>

<svelte:head><title>Formula One Data</title></svelte:head>

{#if $seasonSelected !== undefined && $rounds[$seasonSelected] !== undefined}
    <h1>{$seasonSelected} Formula One World Championship</h1>
    <h2>Races</h2>

    <table>
        <thead>
            <th>No.</th>
            <th>GP</th>
            <th>Circuit</th>
            <th />
            <th />
        </thead>
        <tbody>
            {#each $rounds[$seasonSelected] as race}
                <tr>
                    <td>{race.round}</td>
                    <td>{race.name}</td>
                    <td>
                        <div class="tooltip">
                            {race.circuit}
                            <span class="tooltiptext">{race.location}</span>
                        </div>
                    </td>
                    <td>
                        <a href="/{$seasonSelected}_{race.round}/qualy">Info</a
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <Loader />
{/if}
