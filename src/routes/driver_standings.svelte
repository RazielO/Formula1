<script>
    import Loader from "../components/Loader.svelte";

    import { goto } from "@sapper/app";

    import { rounds, seasonSelected, drivers } from "../stores.js";

    import * as consumer from "../api_consumer/consumer.js";
    import { onMount } from "svelte";
    import { getDriver } from "../api_consumer/consumer/drivers";

    const getStandings = async () => {
        if ($rounds[$seasonSelected] === undefined) {
            goto("/");
        } else {
            if ($rounds[$seasonSelected].driverStandings === undefined) {
                let result = await consumer.getSeasonDriverStandings(
                    $seasonSelected
                );

                rounds.update((value) => {
                    value[$seasonSelected].driverStandings = result;
                    return value;
                });
            }
        }
    };

    const findDriver = (name) => {
        return Object.keys($drivers).filter(
            (k) => $drivers[k].name === name
        )[0];
    };

    onMount(async () => {
        let driversData = await consumer.getDrivers($seasonSelected);
        Object.keys(driversData).map((driver) => {
            if ($drivers[driver] === undefined) {
                drivers.update((value) => {
                    value[driver] = driversData[driver];
                    return value;
                });
            }
        });

        seasonSelected.subscribe(() => getStandings());
    });
</script>

{#if $rounds[$seasonSelected] === undefined}
    <Loader />
{:else if $rounds[$seasonSelected].driverStandings !== undefined && $rounds[$seasonSelected].driverStandings.length === 0}
    <h2>Sorry! There is no information</h2>
{:else if $rounds[$seasonSelected].driverStandings !== undefined}
    <h1>{$seasonSelected} Formula One World Championship</h1>
    <h2>Driver Standings</h2>

    <table>
        <thead>
            <th>Position</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Points</th>
            <th>Wins</th>
        </thead>
        <tbody>
            {#each $rounds[$seasonSelected].driverStandings as driver}
                <tr>
                    {#if driver.status === "E"}
                        <td>{driver.position} (Excluded)</td>
                    {:else if driver.status === "D"}
                        <td>{driver.position} (Disqualified)</td>
                    {:else}
                        <td>{driver.position}</td>
                    {/if}
                    <td
                        ><a href="/drivers/{findDriver(driver.name)}"
                            >{driver.name}</a
                        ></td
                    >
                    <td>{driver.constructor}</td>
                    <td>{driver.points}</td>
                    <td>{driver.wins}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <Loader />
{/if}
