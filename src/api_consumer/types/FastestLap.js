export class FastestLap {
    constructor(data) {
        this.driverId = data.Driver.driverId
        this.driver = `${data.Driver.givenName} ${data.Driver.familyName}`
        this.time = data.FastestLap.Time.time
        this.lap = data.FastestLap.lap
    }
}