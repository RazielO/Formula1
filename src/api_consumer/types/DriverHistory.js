export class DriverHistory {
    constructor(data) {
        this.season = data.season;
        this.position = parseInt(data.DriverStandings[0].position);
        this.status = data.DriverStandings[0].positionText;
        this.points = parseFloat(data.DriverStandings[0].points);
        this.wins = parseInt(data.DriverStandings[0].wins);
        this.constructors = data.DriverStandings[0].Constructors.map(
            (c) => c.name
        );
    }
}