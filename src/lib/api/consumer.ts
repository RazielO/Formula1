import type { MRData } from "./types/MRData"
import type { QualifyingResult } from "./types/QualifyingResult"
import type { RaceResult } from "./types/RaceResult"
import type { Race, RaceTable } from "./types/Races"
import type { SeasonTable } from "./types/Seasons"

export const BASE_URL = "https://api.jolpi.ca/ergast/f1"

export class Consumer {
    static async getFirstSeason(): Promise<number> {
        const url = `${BASE_URL}/seasons.json?limit=1`
        const response: { MRData: MRData } = await fetch(url).then(data => data.json());

        if (response.MRData.SeasonTable !== undefined) {
            const data: SeasonTable = response.MRData.SeasonTable;
            return Number.parseInt(data.Seasons[0].season);
        }

        return 1950;
    }


    static async getRaces(season: number): Promise<Race[]> {
        let url = `${BASE_URL}/${season}.json`;
        let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

        if (response.MRData.RaceTable !== undefined) {
            const data: RaceTable = response.MRData.RaceTable;
            return data.Races;
        }

        return [];
    }

    static async getQualyResults(season: number, round: number): Promise<QualifyingResult[]> {
        let url = `${BASE_URL}/${season}/${round}/qualifying.json`;
        let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

        if (response.MRData.RaceTable?.Races.length === 0) {
            return [];
        }

        return response.MRData.RaceTable?.Races[0].QualifyingResults!;
    }

    static async getRaceResults(season: number, round: number): Promise<RaceResult[]> {
        let url = `${BASE_URL}/${season}/${round}/results.json`;
        let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

        if (response.MRData.RaceTable?.Races.length === 0) {
            return [];
        }

        return response.MRData.RaceTable?.Races[0].Results!;
    }

    static async getSprintResults(season: number, round: number): Promise<RaceResult[]> {
        let url = `${BASE_URL}/${season}/${round}/sprint.json`;
        let response: { MRData: MRData } = await fetch(url).then((data) => data.json());

        if (response.MRData.RaceTable?.Races.length === 0) {
            return [];
        }

        return response.MRData.RaceTable?.Races[0].SprintResults!;
    }
}