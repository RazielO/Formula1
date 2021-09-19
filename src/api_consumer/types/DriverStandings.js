export class DriverStandings {
    constructor(data) {
        this.position = data.position
        this.points = data.points
        this.wins = data.wins
        this.name = `${data.Driver.givenName} ${data.Driver.familyName}`
        this.constructor = data.Constructors.map(
            (constructor) => constructor.name
        ).join(", ")
        this.status = data.positionText
    }
}