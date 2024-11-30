import { BASE_URL } from "../consumer";
import type { MRData } from "../types/MRData";
import type { SeasonTable } from "../types/Seasons";

export async function getFirstSeason(): Promise<number> {
    const url = `${BASE_URL}/seasons.json?limit=1`
    const response: { MRData: MRData } = await fetch(url).then(data => data.json());

    if (response.MRData.SeasonTable !== undefined) {
        const data: SeasonTable = response.MRData.SeasonTable;
        return Number.parseInt(data.Seasons[0].season);
    }

    return 1950;
}