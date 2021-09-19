import { BASE_URL } from "../common.js"

import { Round } from "../types/Round.js";

export const getRounds = async (season) => {
    let url = `${BASE_URL}/${season}.json`;

    let response = await fetch(url).then((data) => data.json());

    let races = response.MRData.RaceTable.Races
    return races.map(race => new Round(race))
}