import wtf from "wtf_wikipedia";

import { BASE_URL } from "../common.js"

import { Driver } from "../types/Driver.js";
import { DriverHistory } from "../types/DriverHistory.js"
import { DriverBio } from "../types/DriverBio.js"

const getColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
};

export const getDrivers = async (season) => {
    let url = `${BASE_URL}/${season}/drivers.json`

    let response = await fetch(url).then(data => data.json())
    let results = response.MRData.DriverTable.Drivers

    let drivers = {}

    results.map(driver => {
        drivers[driver.driverId] = new Driver(driver, getColor())
    });

    return drivers;
};

export const getDriver = async (driverId) => {
    let url = `${BASE_URL}/drivers/${driverId}.json`

    let response = await fetch(url).then(data => data.json())

    let result = response.MRData.DriverTable.Drivers[0];

    return result
}

export const getDriverInfo = async (driverId) => {
    let result = await getDriver(driverId)

    let seasons = await getDriverActiveSeasons(result.driverId)
    let { image, infobox } = await getDriverWiki(result.url)

    let isCurrent = parseInt(seasons[seasons.length - 1]) === new Date().getFullYear()
    let history = await getDriverHistory(result.driverId, isCurrent)

    return new DriverBio(
        result,
        image,
        infobox,
        history,
        seasons
    );
}

const getDriverHistory = async (driverId, isCurrent) => {
    let url = `${BASE_URL}/drivers/${driverId}/driverStandings.json`

    let response = await fetch(url).then(data => data.json())

    let results = response.MRData.StandingsTable.StandingsLists;

    if (isCurrent) {
        let currentUrl = `${BASE_URL}/current/driverStandings.json`
        let currentStandings = await fetch(currentUrl).then((d) => d.json());

        let currentResult =
            currentStandings.MRData.StandingsTable.StandingsLists[0];
        let currentDrivers = currentResult.DriverStandings;

        results.push({
            season: currentResult.season,
            round: currentResult.round,
            DriverStandings: [
                currentDrivers.filter(
                    (o) => o.Driver.driverId === driverId
                )[0],
            ],
        });
    }

    return results.map(season => new DriverHistory(season))
}

const getDriverActiveSeasons = async (driverId) => {
    let url = `${BASE_URL}/drivers/${driverId}/seasons.json`

    let response = await fetch(url).then(data => data.json())

    let results = response.MRData.SeasonTable.Seasons;

    return results.map(season => parseInt(season.season))
}

const getDriverWiki = async (wikiUrl) => {
    let image;
    let infobox;

    let doc = await wtf.fetch(wikiUrl)
    // .then((doc) => {
    //     image = doc.images()[0].json();
    //     infobox = doc.infobox().json();
    //     console.log(image);
    //     console.log(infobox);
    // });

    return {
        image: doc.images()[0].json(),
        infobox: doc.infobox().json()
    }
}