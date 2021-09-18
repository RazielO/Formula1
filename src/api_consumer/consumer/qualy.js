import { BASE_URL } from "../common.js"

import { DriverQualy } from "../types/DriverQualy.js";

export const getQualy = async (season, round) => {
    let url = `${BASE_URL}/${season}/${round}/qualifying.json`

    let response = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable.Races.length === 0)
        return []

    let results =
        response.MRData.RaceTable.Races[0].QualifyingResults;

    return results.map(driver => new DriverQualy(driver))
}