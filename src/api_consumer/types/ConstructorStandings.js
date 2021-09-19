export class ConstructorStandings {
    constructor(data) {
        this.position = data.position
        this.points = data.points
        this.wins = data.wins
        this.name = data.Constructor.name
        this.nationality = data.Constructor.nationality
        this.status = data.positionText
    }
}