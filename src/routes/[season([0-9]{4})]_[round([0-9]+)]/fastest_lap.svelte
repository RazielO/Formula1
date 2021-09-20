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
    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import Loader from "../../components/Loader.svelte";

    import { rounds, nationalities } from "../../stores.js";
    import * as consumer from "../../api_consumer/consumer.js";

    export let data;

    let season = data.season;
    let round = data.round;
    let roundApi = data.roundApi;

    const getResult = async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            if (!Object.keys($rounds[season][round]).includes("result")) {
                let result = await consumer.getResult(season, roundApi);

                rounds.update((value) => {
                    value[season][round].result = result;
                    return value;
                });
            }
        }
    };

    onMount(() => {
        rounds.subscribe(() => getResult());
    });
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round] !== undefined}
        <h1>{season} {$rounds[season][round].name}</h1>

        {#if $rounds[season][round].result === undefined}
            <Loader />
        {:else}
            {#if $rounds[season][round].result.fastestLap !== undefined && $rounds[season][round].result.fastestLap === null}
                <h2>There is no record for fastest lap</h2>
            {:else if $rounds[season][round].result.fastestLap !== undefined}
                <h2>Fastest Lap</h2>

                <p><b>{$rounds[season][round].result.fastestLap.time}</b></p>
                <p>
                    <b
                        ><a
                            href="/drivers/{$rounds[season][round].result
                                .fastestLap.driverId}"
                            >{$rounds[season][round].result.fastestLap
                                .driver}</a
                        ></b
                    >
                    (Lap {$rounds[season][round].result.fastestLap.lap})
                </p>
            {/if}

            <h2>Drivers fastests laps</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Constructor</th>
                        <th>Fastest Lap</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $rounds[season][round].result.drivers as driver}
                        {#if driver.fastestLap}
                            <tr>
                                <td>
                                    <a href="/drivers/{driver.driverId}"
                                        >{driver.driver}</a
                                    >
                                </td>
                                <td>{driver.constructor}</td>
                                <td>{driver.fastestLap}</td>
                            </tr>
                        {/if}
                    {/each}
                </tbody>
            </table>
        {/if}
    {:else}
        <Loader />
    {/if}
{:else}
    <Loader />
{/if}
