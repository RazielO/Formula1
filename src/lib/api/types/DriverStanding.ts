import type { Constructor } from "./Constructor"
import type { Driver } from "./Driver"

export type DriverStanding = {
    position: string,
    positionText: string,
    points: string,
    wins: string,
    Driver: Driver,
    Constructors: Constructor[]
}