<script>
    import Loader from "../components/Loader.svelte";

    import { rounds, seasonSelected } from "../stores.js";

    const createStandings = (data) => {
        return data.map((driver) => {
            return {
                position: driver.position,
                points: driver.points,
                wins: driver.wins,
                name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                constructor: driver.Constructors.map(
                    (constructor) => constructor.name
                ).join(", "),
                status: driver.positionText,
            };
        });
    };

    const getStandings = async () => {
        let url = `https://ergast.com/api/f1/${$seasonSelected}/driverStandings.json`;

        if ($rounds[$seasonSelected] === undefined) {
            rounds.update((val) => {
                val[$seasonSelected] = [];
                return val;
            });
        }

        if ($rounds[$seasonSelected].driverStandings === undefined) {
            let response = await fetch(url).then((data) => data.json());

            if (response.MRData.StandingsTable.StandingsLists.length !== 0) {
                let data =
                    response.MRData.StandingsTable.StandingsLists[0]
                        .DriverStandings;

                rounds.update((val) => {
                    val[$seasonSelected].driverStandings =
                        createStandings(data);
                    return val;
                });
            } else {
                rounds.update((val) => {
                    val[$seasonSelected].driverStandings = [];
                    return val;
                });
            }
        }
    };

    $: {
        season = season;
        getStandings();
    }
</script>

{#if $rounds[$seasonSelected] === undefined}
    <Loader />
{:else if $rounds[$seasonSelected].driverStandings !== undefined && $rounds[$seasonSelected].driverStandings.length === 0}
    <h2>Sorry! There is no information</h2>
{:else if $rounds[$seasonSelected].driverStandings !== undefined}
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
                    <td>{driver.name}</td>
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
