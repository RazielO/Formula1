import type { StandingsTable } from "./Standings"
import type { RaceTable } from "./Races"
import type { SeasonTable } from "./Seasons"

export type MRData = {
    xmlns: string,
    series: string,
    url: string,
    limit: string,
    offset: string,
    total: string,
    SeasonTable: SeasonTable | undefined,
    RaceTable: RaceTable | undefined,
    StandingsTable: StandingsTable | undefined
}