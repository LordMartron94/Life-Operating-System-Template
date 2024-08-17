const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/HandleFrontmatter')];

const {UUIDv4, formatDate, readFromJson} = require('../utils');
const {FrontmatterHandler} = require('../HandleFrontmatter');

class EventNote {
    constructor(note, datePropName, colorPropName = "color", descriptionPropName = "description") {
        this.note = note;
        this.datePropName = datePropName;
        this.colorPropName = colorPropName;
        this.descriptionPropName = descriptionPropName;
        this.frontmatterHandler = new FrontmatterHandler();
    }

    async updateMetadata(updatedEvent) {
        let newStartDate = new Date(updatedEvent.start);
        let newEndDate = new Date(updatedEvent.end);
        let newColor = updatedEvent.extendedProps.color;
        let newDescription = updatedEvent.extendedProps.description;

        const noteFile = this.noteToFile(updatedEvent.extendedProps.note);

        let formattedNewStartDate = formatDate(newStartDate);
        let formattedNewEndDate = formatDate(newEndDate);

        let datePropName = updatedEvent.extendedProps.datePropName;
        let endDatePropName = datePropName + "_End";
        let colorPropName = updatedEvent.extendedProps.colorPropName;
        let descriptionPropName = updatedEvent.extendedProps.descriptionPropName;

        const propertiesToUpdate = {};

        propertiesToUpdate[datePropName] = formattedNewStartDate;
        propertiesToUpdate[endDatePropName] = formattedNewEndDate;
        propertiesToUpdate[colorPropName] = newColor;
        propertiesToUpdate[descriptionPropName] = newDescription;

        await this.frontmatterHandler.editProperties(noteFile, propertiesToUpdate);
    }

    async isNoteValid() {
        const filterData = await readFromJson("0000 Meta/JavaScript/Customization/filters.json");

        for (const filter of filterData["Filters"]) {
            const associatedMetaDataForNote = this.note[filter["AssociatedNoteMetadataKey"]];

            if (associatedMetaDataForNote === undefined || associatedMetaDataForNote === null) {
                return false;
            }

            if (!filter["PossibleValues"].includes(associatedMetaDataForNote.path)) {
                console.log(`False because ${associatedMetaDataForNote.path} is not a valid value for ${filter["ScriptKey"]}`);
                return false;
            }
        }

        return true;
    }

    async getTaskOptionalInformation() {
        const info = {}

        const propertyKeys = [
            "10kPriority",
            "dailyType",
            "projectedTime"
        ]

        for (let prop of propertyKeys) {
            const metadataKey = await this.findPropertyNoteKey(prop);
            const label = await this.findPropertyLabel(prop);

            info[label] = await this.mapValueToLabel(this.note[metadataKey].path, prop);
        }

        return info;
    }

    async findProperty(propertyScriptKey) {
        const propertyData = await readFromJson("0000 Meta/JavaScript/Customization/properties.json");
        const props = propertyData["Properties"];

        for (const prop of props) {
            if (prop["ScriptKey"] === propertyScriptKey) {
                return prop;
            }
        }
    }

    async findPropertyNoteKey(propertyScriptKey) {
        const prop = await this.findProperty(propertyScriptKey);
        return prop["NoteMetadataKey"]
    }

    async findPropertyLabel(propertyScriptKey) {
        const prop = await this.findProperty(propertyScriptKey);
        return prop["Label"]
    }

    async mapValueToLabel(inputValue, propertyScriptKey) {
        console.log(`Input Value: ${inputValue}`);

        const prop = await this.findProperty(propertyScriptKey);
        const valueMappings = prop["ValueMappings"];

        for (const mapping of valueMappings) {
            if (mapping["Value"] === inputValue) {
                return mapping["Label"];
            }
        }

        return "Unknown Label";
    }

    async getId() {
        const noteFile = this.noteToFile(this.note);

        let frontmatter = await this.frontmatterHandler.readFrontmatter(noteFile);
        let id;

        if (frontmatter.id === undefined){
            id = UUIDv4();
            await this.frontmatterHandler.createProperty(noteFile, "id", id);
        }
        else if (frontmatter.id == null || frontmatter.id === "")
        {
            id = UUIDv4();
            await this.frontmatterHandler.editProperty(noteFile, "id", id);
        }
        else
        {
            id = frontmatter.id;
        }

        return id;
    }

    async getEventColor() {
        const priorityColorMapping = [
            {
                "Key": "💰💰💰💰 $10k",
                "Value": "#05d400"
            },
            {
                "Key": "\uD83D\uDCB0\uD83D\uDCB0\uD83D\uDCB0 $1k",
                "Value": "#002cd4"
            },
            {
                "Key": "\uD83D\uDCB0\uD83D\uDCB0 $100",
                "Value": "#a000d4"
            },
            {
                "Key": "\uD83D\uDCB0 $10",
                "Value": "#d40060"
            }
        ]

        const priority = this.note["10k Priority"].path;
        const priorityColor = priorityColorMapping.find(item => item.Key === priority).Value;

        const noteFile = this.noteToFile(this.note);
        let frontmatter = await this.frontmatterHandler.readFrontmatter(noteFile);

        let colorString = frontmatter[this.colorPropName];

        if (colorString === undefined) {
            await this.frontmatterHandler.createProperty(noteFile, this.colorPropName, priorityColor);

            return priorityColor;
        }
        else if (colorString == null || colorString === "") {
            await this.frontmatterHandler.editProperty(noteFile, this.colorPropName, priorityColor);

            return priorityColor;
        }
        else {
            return colorString;
        }
    }

    async increaseEndDate(endDate, hours = 0, minutes = 0) {
        try {
            // If endDate is a timestamp (milliseconds since epoch), convert it to a Date
            if (typeof endDate === "number") {
                endDate = new Date(endDate);
            }
            if (endDate instanceof Date && !isNaN(endDate)) {
                // Calculate the end date by adding hours and minutes to the start date
                endDate.setHours(endDate.getHours() + hours);
                endDate.setMinutes(endDate.getMinutes() + minutes);

                // Format the end date as a datetime string (e.g., "YYYY-MM-DDTHH:mm:ss")
                return formatDate(endDate);
            } else {
                console.error("Invalid start date:", endDate);
                return null; // Handle invalid start date gracefully
            }
        } catch (error) {
            console.error("Error parsing start date:", error);
            return null; // Handle errors gracefully
        }
    }

    async getDescription(defaultDescription) {
        const noteFile = this.noteToFile(this.note);
        let frontmatter = await this.frontmatterHandler.readFrontmatter(noteFile);

        let description = frontmatter[this.descriptionPropName];

        if (description === undefined){
            description = defaultDescription;
            await this.frontmatterHandler.createProperty(noteFile, this.descriptionPropName, defaultDescription);
        }
        else if (description == null || (description === "" && description !== defaultDescription))
        {
            description = defaultDescription;
            await this.frontmatterHandler.editProperty(noteFile, this.descriptionPropName, defaultDescription);
        }

        return description;
    }

    async parseStartDate() {
        const noteFile = this.noteToFile(this.note);
        let frontmatter = await this.frontmatterHandler.readFrontmatter(noteFile);

        let dateString = frontmatter[this.datePropName];

        if (dateString == null || dateString === "") {
            let date = new Date(); // Assign current date and time
            await this.frontmatterHandler.createProperty(noteFile, this.datePropName, formatDate(date));

            return Date.parse(date);
        }

        return Date.parse(dateString);
    }

    async parseEndDate() {
        const noteFile = this.noteToFile(this.note);
        let frontmatter = await this.frontmatterHandler.readFrontmatter(noteFile);

        let dateString = frontmatter[this.datePropName + "_End"];

        if (dateString == null || dateString === "") {
            let date = await this.parseStartDate();
            date = await this.increaseEndDate(date, 0, 30); // Assign default duration of half an hour

            await this.frontmatterHandler.createProperty(noteFile, this.datePropName + "_End", formatDate(new Date(date)));

            return Date.parse(date);
        }

        return Date.parse(dateString);
    }

    async changeColor(colorString) {
        const noteFile = this.noteToFile(this.note);
        await this.frontmatterHandler.editProperty(noteFile, this.colorPropName, colorString);
    }

    deleteNote() {
        const noteFile = this.noteToFile(this.note);
        app.vault.delete(noteFile);
    }

    noteToFile(note) {
        return app.vault.getAbstractFileByPath(note.file.path);
    }
}

module.exports = {
    EventNote
}

