import * as seasons from "./consumers/seasons"
import * as races from "./consumers/races"

export const BASE_URL = "https://api.jolpi.ca/ergast/f1"

export class Consumer {
    static getFirstSeason = async () => await seasons.getFirstSeason()

    static getRaces = async (season: number) => await races.getRaces(season)
}