<script context="module">
    export function preload({ params }) {
        return { driverId: params.driverId };
    }
</script>

<script>
    import { onMount } from "svelte";
    import { goto } from "@sapper/app";

    import { drivers } from "../../../stores.js";

    export let driverId;
    let driver;

    onMount(() => {
        if ($drivers[driverId] === undefined) {
            goto(`/drivers/${driverId}`);
        } else if ($drivers[driverId].info === undefined) {
            goto(`/drivers/${driverId}`);
        } else {
            driver = $drivers[driverId].info;
        }
    });
</script>

{#if $drivers[driverId] !== undefined}
    {#if $drivers[driverId].info !== undefined}
        {#if driver !== undefined}
            <h1>{driver.name} Season Standings</h1>

            <table>
                <thead>
                    <th>Season</th>
                    <th>Position</th>
                    <th>Constructor</th>
                    <th>Points</th>
                    <th>Wins</th>
                </thead>
                <tbody>
                    {#each driver.history as season}
                        <tr>
                            <td>{season.season}</td>
                            {#if season.status === "E"}
                                <td>{season.position} (Excluded)</td>
                            {:else if season.status === "D"}
                                <td>{season.position} (Disqualified)</td>
                            {:else}
                                <td>{season.position}</td>
                            {/if}
                            <td>{season.constructors.join(", ")}</td>
                            <td>{season.points}</td>
                            <td>{season.wins}</td>
                        </tr>
                        <!-- <pre>{JSON.stringify(season, null, 2)}</pre> -->
                    {/each}
                </tbody>
            </table>
        {/if}
    {/if}
{/if}
