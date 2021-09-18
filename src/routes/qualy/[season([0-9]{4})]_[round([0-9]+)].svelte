<script context="module">
    export function preload({ params }) {
        const data = { season: params.season, round: params.round };

        return { data };
    }
</script>

<script>
    import Loader from '../../components/Loader.svelte'

    import { goto } from "@sapper/app";
    import { onMount } from "svelte";

    import { rounds, nationalities } from "../../stores.js";

    export let data;

    let season = data.season;
    let round = data.round;

    const getTimes = (results) => {
        return results.map((race) => {
            return {
                driver: `${race.Driver.givenName} ${race.Driver.familyName}`,
                number: race.number,
                position: race.position,
                nationality: race.Driver.nationality,
                constructor: race.Constructor.name,
                q1: race.Q1,
                q2: race.Q2,
                q3: race.Q3,
            };
        });
    };

    const getQualy = async () => {
        let url = `http://ergast.com/api/f1/${season}/${round}/qualifying.json`;

        if ($rounds[season] === undefined) {
            goto("/");
        } else if ($rounds[season][round] === undefined) {
            goto("/");
        } else {
            if (!Object.keys($rounds[season][round]).includes("qualy")) {
                let response = await fetch(url).then((data) => data.json());

                if (response.MRData.RaceTable.Races.length !== 0) {
                    let results =
                        response.MRData.RaceTable.Races[0].QualifyingResults;

                    rounds.update((val) => {
                        val[season][round].qualy = getTimes(results);
                        return val;
                    });
                } else {
                    rounds.update((val) => {
                        val[season][round].qualy = [];
                        return val;
                    });
                }
            }
        }
    };

    onMount(() => rounds.subscribe(() => getQualy()));
</script>

{#if $rounds[season] !== undefined}
    {#if $rounds[season][round].qualy !== undefined && $rounds[season][round].qualy.length === 0}
        <h1>Sorry! There is no information for this race</h1>
    {:else if $rounds[season][round].qualy !== undefined}
        <h1>{season} {$rounds[season][round - 1].name}</h1>
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
                        <td>
                            <div class="tooltip">
                                {driver.driver}
                                <span class="tooltiptext">
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
                                </span>
                            </div>
                        </td>
                        <td>{driver.constructor}</td>
                        <td>{driver.q1}</td>
                        <td>{driver.q2 !== undefined ? driver.q2 : ""}</td>
                        <td>{driver.q3 !== undefined ? driver.q3 : ""}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <Loader />
    {/if}
{/if}
