import { BASE_URL } from "../common.js"

import { DriverStandings } from "../types/DriverStandings.js"
import { ConstructorStandings } from "../types/ConstructorStandings.js"

export const getSeasonDriverStandings = async (season) => {
    let url = `${BASE_URL}/${season}/driverStandings.json`;

    let response = await fetch(url).then((data) => data.json());

    if (response.MRData.StandingsTable.StandingsLists.length === 0)
        return []

    let data =
        response.MRData.StandingsTable.StandingsLists[0]
            .DriverStandings;
    return data.map(driver => new DriverStandings(driver))
}

export const getSeasonConstructorStandings = async (season) => {
    let url = `${BASE_URL}/${season}/constructorStandings.json`;

    let response = await fetch(url).then((data) => data.json());

    if (response.MRData.StandingsTable.StandingsLists.length === 0)
        return []

    let data =
        response.MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings;
    return data.map(constructor => new ConstructorStandings(constructor))
}