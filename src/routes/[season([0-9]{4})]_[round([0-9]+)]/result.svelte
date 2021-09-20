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
    import Loader from "../../components/Loader.svelte";

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import { rounds, nationalities } from "../../stores.js";
    import * as consumer from "../../api_consumer/consumer/result.js";

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
    {#if $rounds[season][round].result === undefined}
        <Loader />
    {:else if $rounds[season][round].result.drivers !== undefined}
        <h1>{season} {$rounds[season][round].name}</h1>
        <h2>Race Results</h2>

        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Started</th>
                    <th>Name</th>
                    <th>Constructor</th>
                    <th>Status</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {#each $rounds[season][round].result.drivers as driver}
                    <tr>
                        <td>{driver.position}</td>
                        <td>{driver.started}</td>
                        <td
                            ><a href="/drivers/{driver.driverId}"
                                >{driver.driver}</a
                            ></td
                        >
                        <td>{driver.constructor}</td>
                        <td>{driver.status}</td>
                        <td>{driver.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <Loader />
    {/if}
{/if}
