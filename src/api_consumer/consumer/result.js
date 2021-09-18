import { BASE_URL } from "../common.js"

import { DriverResult } from "../types/DriverResult.js";
import { FastestLap } from "../types/FastestLap.js";

export const getResult = async (season, round) => {
    let url = `${BASE_URL}/${season}/${round}/results.json`

    let response = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable.Races.length === 0)
        return []

    let results = response.MRData.RaceTable.Races[0].Results;

    return {
        drivers: results.map(driver => new DriverResult(driver)),
        fastestLap: getFastestLap(results),
    }
}

const getFastestLap = (results) => {
    let filtered = results.filter((race) => race.FastestLap);

    if (filtered.length === 0)
        return null

    let fastest = filtered.filter(
        (race) => race.FastestLap.rank === "1"
    )[0];

    return new FastestLap(fastest);
};