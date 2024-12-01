
import { BASE_URL } from "../consumer";
import type { MRData } from "../types/MRData";
import type { RaceResult } from "../types/RaceResult";

export async function getSprintResults(season: number, round: number): Promise<RaceResult[]> {
    let url = `${BASE_URL}/${season}/${round}/sprint.json`;
    let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable?.Races.length === 0) {
        return [];
    }

    return response.MRData.RaceTable?.Races[0].SprintResults!;
}