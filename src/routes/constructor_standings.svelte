<script>
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";

    import Loader from "../components/Loader.svelte";

    import { rounds, seasonSelected } from "../stores.js";

    import * as consumer from "../api_consumer/consumer.js";

    const getStandings = async () => {
        if ($rounds[$seasonSelected] === undefined) {
            goto("/");
        } else {
            if ($rounds[$seasonSelected].constructorStandings === undefined) {
                let result = await consumer.getSeasonConstructorStandings(
                    $seasonSelected
                );

                rounds.update((value) => {
                    value[$seasonSelected].constructorStandings = result;
                    return value;
                });
            }
        }
    };

    onMount(() => {
        seasonSelected.subscribe(() => {
            getStandings();
        });
    });
</script>

{#if $rounds[$seasonSelected] === undefined}
    <Loader />
{:else if $rounds[$seasonSelected].constructorStandings !== undefined && $rounds[$seasonSelected].constructorStandings.length === 0}
    <h2>Sorry! There is no information</h2>
{:else if $rounds[$seasonSelected].constructorStandings !== undefined}
    <h1>{$seasonSelected} Formula One World Championship</h1>
    <h2>Constructor Standings</h2>

    <table>
        <thead>
            <th>Position</th>
            <th>Constructor</th>
            <th>Nationality</th>
            <th>Points</th>
            <th>Wins</th>
        </thead>
        <tbody>
            {#each $rounds[$seasonSelected].constructorStandings as constructor}
                <tr>
                    {#if constructor.status === "E"}
                        <td>{constructor.position} (Excluded)</td>
                    {:else if constructor.status === "D"}
                        <td>{constructor.position} (Disqualified)</td>
                    {:else}
                        <td>{constructor.position}</td>
                    {/if}
                    <td>{constructor.name}</td>
                    <td>{constructor.nationality}</td>
                    <td>{constructor.points}</td>
                    <td>{constructor.wins}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <Loader />
{/if}
