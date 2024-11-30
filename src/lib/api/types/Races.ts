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
}

export type RaceTable = {
    season: string,
    Races: Race[]
}