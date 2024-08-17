const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/EventNote')];
const {EventNote} = require("./EventNote");

class HoverPopup {
    constructor(jsPath, currentEvent, topPX, leftPX) {
        this.jsPath = jsPath;
        this.event = currentEvent;
        this.topPX = topPX;
        this.leftPX = leftPX;
        this.cssElement = null;
        this.hoverPopup = null;
    }

    async initialize(eventElement) {
        this.cssString = await app.vault.adapter.read(this.jsPath + "/DataviewLibrary/styles/dark.css");

        this.cssElement = this.assignCSS();
        this.hoverPopup = await this.createHoverPopup();

        eventElement.addEventListener("mouseleave", this.dispose);

        // Append the context menu to the document body
        document.body.appendChild(this.hoverPopup);
    }

    assignCSS() {
        const styleElement = document.createElement('style');
        styleElement.textContent = this.cssString;
        document.head.appendChild(styleElement);
        return styleElement;
    }

    async createHoverPopup() {
        const hoverPopup = document.createElement('div');
        hoverPopup.className = 'hover-popup';
        hoverPopup.style.top = `${this.topPX}px`;
        hoverPopup.style.left = `${this.leftPX}px`;

        // Create and format the note title
        const titleElement = document.createElement('div');
        titleElement.className = 'popup-title';
        titleElement.innerText = this.event.extendedProps.note.file.name;

        // Create a divider
        const divider = document.createElement('hr');
        divider.className = 'popup-divider';

        hoverPopup.appendChild(titleElement);
        hoverPopup.appendChild(divider);

        const metadataContainer = await this.createMetadataContainer();
        hoverPopup.appendChild(metadataContainer);

        this.addEventListeners(hoverPopup);

        return hoverPopup;
    }

    async createMetadataContainer() {
        const metadataContainer = document.createElement('div');
        metadataContainer.className = 'metadata-container';

        metadataContainer.appendChild(this.createMetadataElement('popup-metadata', 'Description: ', this.event.extendedProps.description));

        const startDate = this.event.start;
        const endDate = this.event.end;

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        let startMonth = monthNames[startDate.getMonth()];
        let endMonth = monthNames[endDate.getMonth()];

        const formattedStartDateTime = `${startDate.getDate()}-${startMonth}-${startDate.getFullYear()} ${startDate.getHours()}:${startDate.getMinutes() < 10 ? '0' + startDate.getMinutes() : startDate.getMinutes()}`;

        const formattedEndDateTime = `${endDate.getDate()}-${endMonth}-${endDate.getFullYear()} ${endDate.getHours()}:${endDate.getMinutes() < 10 ? '0' + endDate.getMinutes() : endDate.getMinutes()}`;

        metadataContainer.appendChild(this.createMetadataElement('popup-metadata', 'Date (Start): ', formattedStartDateTime));
        metadataContainer.appendChild(this.createMetadataElement('popup-metadata', 'Date (End): ', formattedEndDateTime));
        metadataContainer.appendChild(this.createMetadataElement('popup-metadata', 'Duration: ', this.calculateDuration()));
        metadataContainer.appendChild(this.createColorContainer());

        const eventNote = new EventNote(this.event.extendedProps.note, this.event.extendedProps.datePropName, this.event.extendedProps.colorPropName, this.event.extendedProps.descriptionPropName);
        const optionals = await eventNote.getTaskOptionalInformation();

        // Check if any of the values in optionals are not undefined or null
        const hasValue = Object.values(optionals).some(value => value !== undefined && value !== null && value !== "");

        if (hasValue) {
            // Divider for extra properties
            const divider = document.createElement('hr');
            divider.className = 'popup-divider';
            metadataContainer.appendChild(divider);

            for (let key in optionals) {
                const value = optionals[key];
                metadataContainer.appendChild(this.createMetadataElement('popup-metadata', key + ": ", value));
            }
        }

        return metadataContainer;
    }

    createMetadataElement(className, key, value) {
        const element = document.createElement('div');
        element.className = className;

        if (key) {
            const keyElement = document.createElement('span');
            keyElement.className = 'popup-key';
            keyElement.innerText = key;
            element.appendChild(keyElement);
        }

        if (value) {
            const valueElement = document.createElement('span');
            valueElement.className = 'popup-value';
            valueElement.innerText = value;
            element.appendChild(valueElement);
        }

        return element;
    }

    calculateDuration() {
        const start = new Date(this.event.start);
        const end = new Date(this.event.end);
        const durationInMinutes = (end - start) / (60 * 1000);
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        return `${hours} Hours | ${minutes} Minutes`;
    }

    createColorContainer() {
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color-container';

        colorContainer.appendChild(this.createMetadataElement('popup-metadata', 'Color: ', this.event.extendedProps.color));

        const colorBlock = document.createElement('div');
        colorBlock.className = 'popup-color-block';
        colorBlock.style.backgroundColor = this.event.extendedProps.color;
        colorContainer.appendChild(colorBlock);

        return colorContainer;
    }

    addEventListeners(hoverPopup) {
        document.body.addEventListener('click', (event) => {
            if (!hoverPopup.contains(event.target)) {
                this.dispose();
            }
        });

        document.body.addEventListener('contextmenu', (event) => {
            if (!hoverPopup.contains(event.target)) {
                this.dispose();
            }
        });
    }

    dispose = () => {
        document.body.removeEventListener('mouseleave', this.dispose);
        document.body.removeEventListener('click', this.dispose);
        document.body.removeEventListener('contextmenu', this.dispose);

        if (this.hoverPopup && this.hoverPopup.parentNode === document.body) {
            document.body.removeChild(this.hoverPopup);
        }

        if (this.cssElement && this.cssElement.parentNode === document.head) {
            document.head.removeChild(this.cssElement);
        }
    }
}

module.exports = {
    HoverPopup
}
