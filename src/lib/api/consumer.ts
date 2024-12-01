import * as seasons from "./consumers/seasons"
import * as races from "./consumers/races"
import * as qualy from "./consumers/qualyfing"
import * as raceResults from "./consumers/raceResults"
import * as sprintResults from "./consumers/sprintResults"

export const BASE_URL = "https://api.jolpi.ca/ergast/f1"

export class Consumer {
    static getFirstSeason = async () => await seasons.getFirstSeason();

    static getRaces = async (season: number) => await races.getRaces(season);

    static getQualyResults = async (season: number, round: number) => await qualy.getQualyResults(season, round);

    static getRaceResults = async (season: number, round: number) => await raceResults.getRaceResults(season, round);

    static getSprintResults = async (season: number, round: number) => await sprintResults.getSprintResults(season, round);
}