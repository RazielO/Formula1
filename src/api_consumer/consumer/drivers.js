import { BASE_URL } from "../common.js"
import { Driver } from "../types/Driver.js";

const getColor = () => {
    return "#" + Math.random().toString(16).slice(2, 8);
};

export const getDrivers = async (season) => {
    let url = `${BASE_URL}/${season}/drivers.json`

    let response = await fetch(url).then(data => data.json())
    let results = response.MRData.DriverTable.Drivers

    let drivers = {}

    results.map(driver => {
        drivers[driver.driverId] = new Driver(driver, getColor())
    });

    return drivers;
};