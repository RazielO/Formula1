export class DriverQualy {
    constructor(data) {
        this.driver = `${data.Driver.givenName} ${data.Driver.familyName}`;
        this.number = data.number;
        this.position = data.position;
        this.nationality = data.Driver.nationality;
        this.constructor = data.Constructor.name;
        this.q1 = data.Q1;
        this.q2 = data.Q2 === undefined ? "" : data.Q2;
        this.q3 = data.Q3 === undefined ? "" : data.Q3;
    }
}