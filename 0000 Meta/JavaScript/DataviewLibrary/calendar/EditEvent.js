const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/EventNote')];

const { dateToDatetimeLocalString, isValidColor, rgbToHex} = require("../utils");
const { EventNote } = require("./EventNote");

class EditEvent {
    constructor(jsPath, currentEvent) {
        this.jsPath = jsPath;
        this.event = currentEvent;
        this.cssElement = null;
        this.editEventPopup = null;
        this.resolve = null; // Add a resolve property to hold the Promise resolve function
    }

    async initialize() {
        this.cssString = await app.vault.adapter.read(this.jsPath + "/DataviewLibrary/styles/dark.css");

        this.cssElement = this.assignCSS();
        this.editEventPopup = await this.createEditEventPopup();

        // Append the context menu to the document body
        document.body.appendChild(this.editEventPopup);

        // Return a Promise that resolves when the "Save" button is clicked
        return new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    assignCSS() {
        const styleElement = document.createElement('style');
        styleElement.textContent = this.cssString;
        document.head.appendChild(styleElement);
        return styleElement;
    }

    async createEditEventPopup() {
        const editEventPopup = document.createElement('div');
        editEventPopup.className = 'edit-event-popup';

        // Create and format the note title
        const titleElement = document.createElement('div');
        titleElement.className = 'popup-title';
        titleElement.innerText = this.event.extendedProps.note.file.name;

        // Create a divider
        const divider = document.createElement('hr');
        divider.className = 'popup-divider';

        editEventPopup.appendChild(titleElement);
        editEventPopup.appendChild(divider);

        // Create a color input container
        const colorInputContainer = document.createElement('div');
        colorInputContainer.className = 'color-input-container';

        // Create a label for color
        const colorLabel = document.createElement('label');
        colorLabel.innerText = 'Color:';
        colorLabel.className = 'input-label';

        // Create a color picker input
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = rgbToHex(this.event.extendedProps.color);
        colorPicker.className = 'color-input';

        // Create a text input for color value
        const colorValueInput = document.createElement('input');
        colorValueInput.type = 'text';
        colorValueInput.placeholder = 'Input Hex Color here or use RGB (e.g., #RRGGBB or rgb(r, g, b))';
        colorValueInput.value = rgbToHex(this.event.extendedProps.color);
        colorValueInput.className = 'color-value-input';

        // Add input event listeners to update each other
        colorPicker.addEventListener('input', () => {
            colorValueInput.value = colorPicker.value;
        });

        colorValueInput.addEventListener('input', () => {
            const enteredColor = colorValueInput.value;
            if (isValidColor(enteredColor)) {
                colorPicker.value = rgbToHex(enteredColor);
            }
        });

        colorInputContainer.appendChild(colorLabel);
        colorInputContainer.appendChild(colorPicker);
        colorInputContainer.appendChild(colorValueInput);

        // Create input containers for start date and end date
        const startDateInput = this.createInputContainer(
            'Start Date:',
            'datetime-local',
            dateToDatetimeLocalString(new Date(this.event.start))
        );
        const endDateInput = this.createInputContainer(
            'End Date:',
            'datetime-local',
            dateToDatetimeLocalString(new Date(this.event.end))
        );

        // Create a duration input container
        const durationInput = this.createInputContainer(
            'Duration (minutes):',
            'number',
            ((this.event.end - this.event.start) / (1000 * 60)).toFixed(0)
        );

        // Add input event listeners to update each other
        startDateInput.querySelector('input').addEventListener('input', () => {
            const start = Date.parse(startDateInput.querySelector('input').value);
            const duration = parseInt(durationInput.querySelector('input').value);
            if (!isNaN(start) && !isNaN(duration)) {
                endDateInput.querySelector('input').value = new Date(start + duration * 60000).toISOString().slice(0, -1);
            }
        });

        endDateInput.querySelector('input').addEventListener('input', () => {
            const end = Date.parse(endDateInput.querySelector('input').value);
            const start = Date.parse(startDateInput.querySelector('input').value);
            if (!isNaN(end) && !isNaN(start)) {
                durationInput.querySelector('input').value = ((end - start) / (1000 * 60)).toFixed(0);
            }
        });

        durationInput.querySelector('input').addEventListener('input', () => {
            const duration = parseInt(durationInput.querySelector('input').value);
            const start = Date.parse(startDateInput.querySelector('input').value);
            if (!isNaN(duration) && !isNaN(start)) {
                endDateInput.querySelector('input').value = dateToDatetimeLocalString(new Date(start + duration * 60000));
            }
        });

        // Create a text input for description value
        const descriptionValueInput = this.createTextAreaContainer('Description: ', this.event.extendedProps.description, 'text-input-value', "Put your event description here.");

        // Create a delete input button
        const deleteButton = this.createDeleteButton();

        // Create a Save button to save changes
        const saveButton = document.createElement('button');
        saveButton.type = 'submit';
        saveButton.innerText = 'Save';

        saveButton.addEventListener('click', () => {
            const start = Date.parse(startDateInput.querySelector('input').value);
            const end = Date.parse(endDateInput.querySelector('input').value);
            const color = colorValueInput.value;
            const description = descriptionValueInput.querySelector('textarea').value;

            if (isNaN(start) || isNaN(end) || start >= end || !isValidColor(color)) {
                let noticeText = `Please enter valid start and end dates and a valid color.`;
                let noticeDurationSeconds = 10;

                new Notice(noticeText, noticeDurationSeconds * 1000);

                console.error(noticeText);
            }
            else {
                // Update event details with user inputs
                const updatedEvent = {
                    id: this.event.id,
                    start: start,
                    end: end,
                    title: this.event.extendedProps.note.file.name,
                    editable: true,
                    color: color,
                    extendedProps: {
                        file: this.event.extendedProps.file,
                        directory: this.event.extendedProps.directory,
                        datePropName: this.event.extendedProps.datePropName,
                        colorPropName: this.event.extendedProps.colorPropName,
                        descriptionPropName: this.event.extendedProps.descriptionPropName,
                        description: description,
                        note: this.event.extendedProps.note,
                        color: color,
                    },
                };

                // Resolve the Promise with the updated event
                this.resolve(updatedEvent);

                // Close the edit event popup
                this.dispose();
            }
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'edit-button-container';

        buttonContainer.appendChild(saveButton);
        buttonContainer.appendChild(deleteButton);

        // Append input fields and save button to the popup
        editEventPopup.appendChild(descriptionValueInput);

        const eventNote = new EventNote(this.event.extendedProps.note, this.event.extendedProps.datePropName, this.event.extendedProps.colorPropName, this.event.extendedProps.descriptionPropName);
        const optionals = await eventNote.getTaskOptionalInformation();

        // Check if any of the values in optionals are not undefined or null
        const hasValue = Object.values(optionals).some(value => value !== undefined && value !== null);

        if (hasValue) {
            // Divider for extra properties
            const divider = document.createElement('hr');
            divider.className = 'popup-divider';
            editEventPopup.appendChild(divider);

            const label = document.createElement('label');
            label.innerText = "Optional Metadata:";
            label.className = 'input-label';

            editEventPopup.appendChild(label);

            const metadataInspection = this.createMetadataInspection(optionals);
            editEventPopup.appendChild(metadataInspection)

            const divider2 = document.createElement('hr');
            divider2.className = 'popup-divider';

            editEventPopup.appendChild(divider2);
        }

        editEventPopup.appendChild(startDateInput);
        editEventPopup.appendChild(endDateInput);
        editEventPopup.appendChild(durationInput);
        editEventPopup.appendChild(colorInputContainer);
        editEventPopup.appendChild(buttonContainer);

        // Add a click event listener to the document body to detect clicks outside the modal
        document.body.addEventListener('click', (event) => {
            if (!editEventPopup.contains(event.target)) {
                this.dispose();
            }
        });

        // Add a right-click event listener to the document body to detect clicks outside the modal
        document.body.addEventListener('contextmenu', (event) => {
            if (!editEventPopup.contains(event.target)) {
                this.dispose();
            }
        });

        return editEventPopup;
    }

    createTextAreaContainer(labelText, initialValue, inputClassName = null, placeholder = "Input here!") {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
        const label = document.createElement('label');
        label.innerText = labelText;
        label.className = 'input-label';
        const textarea = document.createElement('textarea'); // Change 'input' to 'textarea'

        if (inputClassName != null)
            textarea.className = inputClassName;

        textarea.value = initialValue;
        textarea.placeholder = placeholder;
        inputContainer.appendChild(label);
        inputContainer.appendChild(textarea); // Append the textarea instead of the input
        return inputContainer;
    }

    createInputContainer(labelText, inputType, initialValue, inputClassName = null, placeholder = "Input here!") {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
        const label = document.createElement('label');
        label.innerText = labelText;
        label.className = 'input-label';
        const input = document.createElement('input');

        if (inputClassName != null)
            input.className = inputClassName;

        input.type = inputType;
        input.value = initialValue;
        input.placeholder = placeholder;
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        return inputContainer;
    }

    createDeleteButton() {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Event';
        deleteButton.type = 'delete';

        deleteButton.addEventListener('click', () => {
            // Convert the event into EventNote and call deleteNote
            const eventNote = new EventNote(this.event.extendedProps.note, this.event.extendedProps.datePropName, this.event.extendedProps.colorPropName, this.event.extendedProps.descriptionPropName);
            eventNote.deleteNote();

            // Close the edit event popup
            this.dispose();
        });

        return deleteButton;
    }

    createMetadataInspection(optionals) {
        // Create a container div
        const container = document.createElement('div');
        container.className = "edit-menu-inspection-container";

        for (let key in optionals) {
            const value = optionals[key];

            // Create a metadata container div
            const metadataContainer = document.createElement('div');
            metadataContainer.classList.add('metadata-container');

            // Create a label element
            const label = document.createElement('span');
            label.textContent = key + ": "; // You can replace this with your desired label text
            label.className = 'popup-key'

            // Create a value element
            const valueElement = document.createElement('span');
            valueElement.textContent = value; // Replace with your desired value
            valueElement.className = 'popup-value'

            // Append the label and value elements to the metadata container
            metadataContainer.appendChild(label);
            metadataContainer.appendChild(valueElement);

            // Make the value read-only
            valueElement.contentEditable = false;

            // Append the metadata container to the main container
            container.appendChild(metadataContainer);
        }

        return container;
    }


    dispose = () => {
        document.body.removeEventListener('click', this.dispose);
        document.body.removeEventListener('contextmenu', this.dispose);

        if (this.editEventPopup && this.editEventPopup.parentNode === document.body) {
            document.body.removeChild(this.editEventPopup);
        }

        if (this.cssElement && this.cssElement.parentNode === document.head) {
            document.head.removeChild(this.cssElement);
        }
    }
}

module.exports = {
    EditEvent
};
