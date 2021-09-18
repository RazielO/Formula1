import * as qualy from "./consumer/qualy.js"
import * as result from "./consumer/result.js"
import * as drivers from "./consumer/drivers.js"
import * as laps from "./consumer/laps.js"

export const getQualy = async (season, round) => await qualy.getQualy(season, round)

export const getResult = async (season, round) => await result.getResult(season, round)

export const getDrivers = async (season) => await drivers.getDrivers(season)

export const getLaps = async (season, round, drivers) => await laps.getLaps(season, round, drivers)