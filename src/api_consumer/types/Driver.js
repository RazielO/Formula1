export class Driver {
    constructor(data, color) {
        this.code = data.code
        this.name = `${data.givenName} ${data.familyName}`
        this.color = color
    }
}