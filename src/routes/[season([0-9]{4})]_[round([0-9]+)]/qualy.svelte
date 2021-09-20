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
    import * as consumer from "../../api_consumer/consumer/qualy.js";

    export let data;

    let season = data.season;
    let round = data.round;
    let roundApi = data.roundApi;

    const getQualy = async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            if (!Object.keys($rounds[season][round]).includes("qualy")) {
                let result = await consumer.getQualy(season, roundApi);

                rounds.update((value) => {
                    value[season][round].qualy = result;
                    return value;
                });
            }
        }
    };

    onMount(() => {
        rounds.subscribe(() => getQualy());
    });
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round].qualy !== undefined && $rounds[season][round].qualy.length === 0}
        <h1>Sorry! There is no information for this race</h1>
    {:else if $rounds[season][round].qualy !== undefined}
        <h1>{season} {$rounds[season][round].name}</h1>
        <h2>Qualifying Results</h2>

        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Constructor</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                </tr>
            </thead>
            <tbody>
                {#each $rounds[season][round].qualy as driver}
                    <tr>
                        <td>{driver.position}</td>
                        <td
                            ><a href="/drivers/{driver.driverId}"
                                >{driver.driver}</a
                            ></td
                        >
                        <td>{driver.constructor}</td>
                        <td>{driver.q1}</td>
                        <td>{driver.q2}</td>
                        <td>{driver.q3}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <Loader />
    {/if}
{/if}
