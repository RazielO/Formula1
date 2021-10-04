<script>
    import { onMount } from "svelte";

    import Loader from "../components/Loader.svelte";

    import { rounds, seasonSelected } from "../stores.js";
    import * as consumer from "../api_consumer/consumer.js";

    const getRounds = async () => {
        if (
            $seasonSelected !== undefined &&
            ($rounds[$seasonSelected] === undefined ||
                $rounds[$seasonSelected].length === 0)
        ) {
            let result = await consumer.getRounds($seasonSelected);

            rounds.update((value) => {
                value[$seasonSelected] = result;
                return value;
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
                    <td>{race.name.replace('Grand Prix', 'GP')}</td>
                    <td>
                        <div class="tooltip">
                            {race.circuit}
                            <span class="tooltiptext">{race.location}</span>
                        </div>
                    </td>
                    <td>
                        <a href="/{$seasonSelected}_{race.round}/background"
                            >Info</a
                        >
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <Loader />
{/if}
