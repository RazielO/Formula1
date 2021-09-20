export class DriverBio {
    constructor(driver, image, infobox, history, seasons) {
        this.id = driver.driverId;
        this.name = `${driver.givenName} ${driver.familyName}`;
        this.nationality = driver.nationality;
        this.dateOfBirth = driver.dateOfBirth;
        this.wiki = driver.url;
        this.image = { thumbnail: image.thumb, url: image.url };
        this.placeOfBirth =
            infobox.birth_place !== undefined
                ? infobox.birth_place.text
                : undefined;
        this.fullName =
            infobox.birth_name !== undefined
                ? infobox.birth_name.text
                : undefined;
        this.history = history
        this.seasons = seasons
    }
}