<script context="module">
    export function preload({ params }) {
        return { driverId: params.driverId };
    }
</script>

<script>
    import { onMount } from "svelte";

    import Loader from "../../../components/Loader.svelte";
    import * as consumer from "../../../api_consumer/consumer.js";

    import { drivers, nationalities } from "../../../stores.js"

    export let driverId;
    let driver;

    const concatSeasons = (seasons) => {
        let result = [];
        let group;
        let idx = 0;

        while (idx < seasons.length) {
            group = seasons.slice(idx).filter((y, i) => y === seasons[idx] + i);

            if (group.length === 1) {
                result.push(seasons[idx].toString());
            } else {
                result.push(`${seasons[idx]} - ${group[group.length - 1]}`);
            }

            idx += group.length;
        }

        return result.join(", ");
    };

    const getDriver = async () => {
        if ($drivers[driverId] === undefined) {
            let driversData = await consumer.getDriver(driverId);
            drivers.update((value) => {
                value[driverId] = driversData;
                return value;
            });
        }

        if ($drivers[driverId].info === undefined) {
            driver = await consumer.getDriverInfo(driverId);
            drivers.update((value) => {
                value[driverId].info = driver;
                return value;
            });
        } else {
            driver = $drivers[driverId].info
        }
    };

    onMount(() => getDriver());
</script>

<svelte:head
    ><title>{driver !== undefined ? driver.name : "Formula One Data"}</title
    ></svelte:head
>

{#if driver !== undefined}
    <h1>{driver.name}</h1>

    <div class="driver">
        <div class="image">
            <img src={driver.image.url} alt={driver.name} />
        </div>
        <div class="info">
            <p>
                <b>Birth name:</b>
                {driver.fullName !== undefined ? driver.fullName : driver.name}
            </p>
            <p>
                <b>Nationality:</b>
                {driver.nationality}
                <img
                    src="https://www.countryflags.io/{$nationalities[
                        driver.nationality.toLowerCase()
                    ]}/flat/32.png"
                    alt={driver.nationality}
                />
            </p>

            {#if driver.placeOfBirth !== undefined}
                <p><b>Birth place:</b> {driver.placeOfBirth}</p>
            {/if}

            <p><b>Birth date:</b> {driver.dateOfBirth}</p>
            <p>
                <b>Active seasons:</b>
                {driver.seasons.length}
                ({concatSeasons(driver.seasons)})
            </p>
            <p>
                <b>Championships: </b>
                {driver.history.filter((season) => season.position === 1)
                    .length}
            </p>
            <p>
                <b>Wins:</b>
                {driver.history
                    .map((season) => season.wins)
                    .reduce((a, b) => a + b)}
            </p>
            <p>
                <b>Points:</b>
                {driver.history
                    .map((season) => season.points)
                    .reduce((a, b) => a + b)}
            </p>
            <p>
                <b>Wikipedia: </b>
                <a href={driver.wiki} target="_blank">{driver.name}</a>
            </p>
        </div>
    </div>
{:else}
    <Loader size="5" units="rem" />
{/if}

<style>
    .driver {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .image img {
        width: 300px;
    }

    .info p {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

	@media only screen and (max-width: 768px) {
        .driver {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>
