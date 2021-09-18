<script context="module">
    export function preload({ params }) {
        const data = { season: params.season, round: params.round };

        return { data };
    }
</script>

<script>
    import Loader from "../../../components/Loader.svelte";

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import { rounds, nationalities, drivers } from "../../../stores.js";

    export let data;

    let season = data.season;
    let round = data.round;

    let url;

    const getColor = () => {
        return "#" + Math.random().toString(16).slice(2, 8);
    };

    const getDrivers = (results) => {
        return results.map((race) => {
            return {
                driver: `${race.Driver.givenName} ${race.Driver.familyName}`,
                number: race.number,
                position: race.position,
                nationality: race.Driver.nationality,
                points: race.points,
                constructor: race.Constructor.name,
                status: race.status,
                started: race.grid === "0" ? "PIT LANE" : race.grid,
                time: race.Time !== undefined ? race.Time.time : "",
                fastestLap:
                    race.FastestLap !== undefined
                        ? `${race.FastestLap.Time.time} (Lap ${race.FastestLap.lap})`
                        : "",
                averageSpeed:
                    race.FastestLap !== undefined
                        ? `${race.FastestLap.AverageSpeed.speed} ${race.FastestLap.AverageSpeed.units}`
                        : "",
            };
        });
    };

    const saveDrivers = (results) => {
        results.map((race) => {
            drivers.update((val) => {
                val[race.Driver.driverId] = {
                    code: race.Driver.code,
                    name: `${race.Driver.givenName} ${race.Driver.familyName}`,
                    color: getColor(),
                };
                return val;
            });
        });
    };

    const getFastestLap = (results) => {
        let filtered = results.filter((race) => race.FastestLap);

        if (filtered.length !== 0) {
            let fastest = filtered.filter(
                (race) => race.FastestLap.rank === "1"
            )[0];

            return {
                driver: `${fastest.Driver.givenName} ${fastest.Driver.familyName}`,
                time: fastest.FastestLap.Time.time,
                lap: fastest.FastestLap.lap,
            };
        } else {
            return null;
        }
    };

    const getResult = async () => {
        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            if (!Object.keys($rounds[season][round]).includes("result")) {
                let response = await fetch(url).then((data) => data.json());

                if (response.MRData.RaceTable.Races.length !== 0) {
                    let results = response.MRData.RaceTable.Races[0].Results;

                    rounds.update((val) => {
                        val[season][round].result = {
                            drivers: getDrivers(results),
                            fastestLap: getFastestLap(results),
                        };
                        return val;
                    });

                    saveDrivers(results);
                } else {
                    rounds.update((val) => {
                        val[season][round].result = [];
                        return val;
                    });
                }
            }
        }
    };

    onMount(() => {
        url = `http://ergast.com/api/f1/${season}/${round}/results.json`;
        round = round - 1;
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
                        <td>
                            <div class="tooltip">
                                {driver.driver}
                                <div class="tooltiptext">
                                    <p><b>Number:</b></p>
                                    <p>{driver.number}</p>
                                    <p>
                                        <b>Nationality: </b>
                                        <img
                                            src="https://www.countryflags.io/{$nationalities[
                                                driver.nationality.toLowerCase()
                                            ]}/flat/32.png"
                                            alt={driver.nationality}
                                        />
                                    </p>
                                </div>
                            </div>
                        </td>
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
