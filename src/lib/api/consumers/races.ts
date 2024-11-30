import { BASE_URL } from "../consumer";
import type { MRData } from "../types/MRData";
import type { Race, RaceTable } from "../types/Races";

export async function getRaces(season: number): Promise<Race[]> {
    let url = `${BASE_URL}/${season}.json`;
    let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable !== undefined) {
        const data: RaceTable = response.MRData.RaceTable;
        return data.Races;
    }

    return [];
}