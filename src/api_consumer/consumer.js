import * as qualy from "./consumer/qualy.js"
import * as result from "./consumer/result.js"
import * as drivers from "./consumer/drivers.js"
import * as laps from "./consumer/laps.js"
import * as standings from "./consumer/standings.js"
import * as rounds from "./consumer/rounds.js"

export const getQualy = async (season, round) => await qualy.getQualy(season, round)

export const getResult = async (season, round) => await result.getResult(season, round)

export const getDrivers = async (season) => await drivers.getDrivers(season)

export const getLaps = async (season, round, drivers) => await laps.getLaps(season, round, drivers)

export const getSeasonDriverStandings = async (season) => await standings.getSeasonDriverStandings(season)

export const getSeasonConstructorStandings = async (season) => await standings.getSeasonConstructorStandings(season)

export const getRounds = async (season) => await rounds.getRounds(season)

export const getDriverInfo = async (driverId) => await drivers.getDriverInfo(driverId)

export const getDriver = async (driverId) => await drivers.getDriver(driverId)