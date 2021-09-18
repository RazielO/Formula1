<script>
    import { onMount } from "svelte";

    import Loader from "../components/Loader.svelte";

    import { rounds, seasonSelected } from "../stores.js";

    const createStandings = (data) => {
        return data.map((constructor) => {
            return {
                position: constructor.position,
                points: constructor.points,
                wins: constructor.wins,
                name: constructor.Constructor.name,
                nationality: constructor.Constructor.nationality,
                status: constructor.positionText,
            };
        });
    };

    const getStandings = async () => {
        let url = `https://ergast.com/api/f1/${$seasonSelected}/constructorStandings.json`;

        if ($rounds[$seasonSelected] === undefined) {
            rounds.update((val) => {
                val[$seasonSelected] = [];
                return val;
            });
        }

        if ($rounds[$seasonSelected].constructorStandings === undefined) {
            let response = await fetch(url).then((data) => data.json());

            if (response.MRData.StandingsTable.StandingsLists.length !== 0) {
                let data =
                    response.MRData.StandingsTable.StandingsLists[0]
                        .ConstructorStandings;

                rounds.update((val) => {
                    val[$seasonSelected].constructorStandings =
                        createStandings(data);
                    return val;
                });
            } else {
                rounds.update((val) => {
                    val[$seasonSelected].constructorStandings = [];
                    return val;
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
