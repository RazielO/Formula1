import type { ConstructorStanding } from './types/ConstructorStanding';
import type { DriverStanding } from './types/DriverStanding';
import type { MRData } from './types/MRData';
import type { QualifyingResult } from './types/QualifyingResult';
import type { RaceResult } from './types/RaceResult';
import type { Race, RaceTable } from './types/Races';
import type { SeasonTable } from './types/Seasons';

export const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

export class Consumer {
  static async getFirstSeason(): Promise<number> {
    const url = `${BASE_URL}/seasons.json?limit=1`;
    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.SeasonTable !== undefined) {
      const data: SeasonTable = response.MRData.SeasonTable;
      return Number.parseInt(data.Seasons[0].season);
    }

    return 1950;
  }

  static async getRaces(season: number): Promise<Race[]> {
    const url = `${BASE_URL}/${season}.json`;
    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable !== undefined) {
      const data: RaceTable = response.MRData.RaceTable;
      return data.Races;
    }

    return [];
  }

  static async getQualyResults(season: number, round: number): Promise<QualifyingResult[]> {
    const url = `${BASE_URL}/${season}/${round}/qualifying.json`;
    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable === undefined || response.MRData.RaceTable!.Races.length === 0) {
      return [];
    }

    return response.MRData.RaceTable!.Races[0].QualifyingResults!;
  }

  static async getRaceResults(season: number, round: number): Promise<RaceResult[]> {
    const url = `${BASE_URL}/${season}/${round}/results.json`;
    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable === undefined || response.MRData.RaceTable?.Races.length === 0) {
      return [];
    }

    return response.MRData.RaceTable!.Races[0].Results!;
  }

  static async getSprintResults(season: number, round: number): Promise<RaceResult[]> {
    const url = `${BASE_URL}/${season}/${round}/sprint.json`;
    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (response.MRData.RaceTable === undefined || response.MRData.RaceTable?.Races.length === 0) {
      return [];
    }

    return response.MRData.RaceTable!.Races[0].SprintResults!;
  }

  static async getDriverStandings(
    season: number,
    round: number | undefined = undefined,
  ): Promise<DriverStanding[]> {
    let url = `${BASE_URL}/${season}/driverStandings.json`;

    if (round !== undefined) {
      url = `${BASE_URL}/${season}/${round}/driverStandings.json`;
    }

    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (
      response.MRData.StandingsTable === undefined ||
      response.MRData.StandingsTable?.StandingsLists.length === 0
    ) {
      return [];
    }

    return response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  }

  static async getConstructorStandings(
    season: number,
    round: number | undefined = undefined,
  ): Promise<ConstructorStanding[]> {
    let url = `${BASE_URL}/${season}/constructorStandings.json`;

    if (round !== undefined) {
      url = `${BASE_URL}/${season}/${round}/constructorStandings.json`;
    }

    const response: { MRData: MRData } = await fetch(url).then((data) => data.json());

    if (
      response.MRData.StandingsTable === undefined ||
      response.MRData.StandingsTable?.StandingsLists.length === 0
    ) {
      return [];
    }

    return response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
  }
}
