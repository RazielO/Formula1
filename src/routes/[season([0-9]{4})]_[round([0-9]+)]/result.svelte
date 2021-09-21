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

    let width;

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

<div bind:clientWidth={width} style="width: 100vw; margin: 0; padding: 0;" />

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
                    {#if width > 768}
                        <th>Started</th>
                    {/if}
                    <th>Name</th>
                    <th>Constructor</th>
                    <th>Status</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {#each $rounds[season][round].result.drivers as driver}
                    <tr>
                        {#if width > 768}
                            <td>{driver.position}</td>
                            <td>{driver.started}</td>
                        {:else if driver.position === driver.started}
                            <td
                                >{driver.position} (<i class="fas fa-equals" /> 0)</td
                            >
                        {:else if driver.started === "PIT LANE"}
                            <td>
                                <span class="pit-lane">{driver.position}</span>
                                (<i class="fas fa-chevron-up" />
                                {Math.abs(
                                    $rounds[season][round].result.drivers
                                        .length - driver.position
                                )})
                            </td>
                        {:else if driver.started < driver.position}
                            <td>
                                {driver.position} (<i
                                    class="fas fa-chevron-up"
                                />
                                {Math.abs(driver.position - driver.started)})
                            </td>
                        {:else}
                            <td>
                                {driver.position} (<i
                                    class="fas fa-chevron-down"
                                />
                                {Math.abs(driver.started - driver.position)})
                            </td>
                        {/if}
                        <td>
                            <a href="/drivers/{driver.driverId}"
                                >{driver.driver}</a
                            >
                        </td>
                        <td>{driver.constructor}</td>
                        <td>{driver.status}</td>
                        <td>{driver.points}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if width <= 768}
            <div class="pit-lane-drivers">
                {#if $rounds[season][round].result.drivers.filter((d) => d.started === "PIT LANE").length > 0}
                    <h3>*: Drivers who started from the pit lane</h3>
                    <li>
                        {#each $rounds[season][round].result.drivers.filter((d) => d.started === "PIT LANE") as driver}
                            <ul>{driver.driver}</ul>
                        {/each}
                    </li>
                {/if}
            </div>
        {/if}
    {:else}
        <Loader />
    {/if}
{/if}

<style>
    .fa-chevron-up {
        color: green;
    }

    .fa-chevron-down {
        color: red;
    }

    @media only screen and (max-width: 768px) {
        .pit-lane::after {
            content: "*";
            font-size: 0.75rem;
            display: inline-block;
            vertical-align: top;
        }
    }
</style>
