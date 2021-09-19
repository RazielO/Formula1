export class Round {
    constructor(data) {
        this.round = data.round
        this.name = data.raceName
        this.circuit = data.Circuit.circuitName
        this.location = `${data.Circuit.Location.locality}, ${data.Circuit.Location.country}`
    }
}