export class DriverResult {
    constructor(data) {
        this.driver = `${data.Driver.givenName} ${data.Driver.familyName}`
        this.number = data.number
        this.position = data.position
        this.nationality = data.Driver.nationality
        this.points = data.points
        this.constructor = data.Constructor.name
        this.status = data.status
        this.started = data.grid === "0" ? "PIT LANE" : data.grid
        this.time = data.Time !== undefined ? data.Time.time : ""
        this.fastestLap = data.FastestLap !== undefined
            ? `${data.FastestLap.Time.time} (Lap ${data.FastestLap.lap})`
            : ""
        this.averageSpeed = data.FastestLap !== undefined
            ? `${data.FastestLap.AverageSpeed.speed} ${data.FastestLap.AverageSpeed.units}`
            : ""
    }
}