import { BASE_URL } from "../common.js"

import { Lap } from "../types/Lap.js";

export const getLaps = async (season, round, drivers) => {
    let url = `${BASE_URL}/${season}/${round}/laps.json?limit=10000`;

    let response = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable.Races.length <= 0)
        return []

    let laps = response.MRData.RaceTable.Races[0].Laps;
    return laps.map((lap) =>
        lap.Timings.map((time) => new Lap(time.driverId, drivers)))
}