
import { BASE_URL } from "../consumer";
import type { MRData } from "../types/MRData";
import type { QualifyingResult } from "../types/QualifyingResult";

export async function getQualyResults(season: number, round: number): Promise<QualifyingResult[]> {
    let url = `${BASE_URL}/${season}/${round}/qualifying.json`;
    let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable?.Races.length === 0) {
        return [];
    }

    return response.MRData.RaceTable?.Races[0].QualifyingResults!;
}