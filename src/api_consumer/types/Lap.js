export class Lap {
    constructor(driverId, drivers) {
        this.name = drivers[driverId].name
        this.code = drivers[driverId].code
        this.color = drivers[driverId].color
    }
}