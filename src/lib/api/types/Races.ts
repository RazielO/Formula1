import type { QualifyingResult } from "./QualifyingResult"

export type BackgroundChild = {
    title: string,
    text: string
}

export type RaceBackground = {
    text: string,
    children: BackgroundChild[],
    url: string | null
}

export type Event = {
    date: string,
    time: string
}

export type Location = {
    lat: string,
    long: string,
    locality: string,
    country: string
}
export type Circuit = {
    circuitId: string,
    url: string,
    circuitName: string,
    Location: Location,
}

export type Race = {
    season: string,
    round: string,
    url: string,
    raceName: string,
    Circuit: Circuit,
    date: string,
    time: string,
    FirstPractice: Event,
    SecondPractice: Event,
    ThirdPractice: Event,
    Qualifying: Event,
    hasBackground: boolean,
    background: RaceBackground,
    QualifyingResults: QualifyingResult[]
}

export type RaceTable = {
    season: string,
    Races: Race[]
}