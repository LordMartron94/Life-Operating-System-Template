const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];

const {isValidColor, rgbToHex} = require("../utils");

class ColorModal {
    constructor(jsPath, eventNote) {
        this.jsPath = jsPath;
        this.resolve = null; // Add a resolve property to hold the Promise resolve function
        this.eventNote = eventNote;
        this.reject = null;
        this.colorModal = null; // Add a property to hold the modal element
    }

    async initialize(currentColor) {
        this.cssString = await app.vault.adapter.read(this.jsPath + "/DataviewLibrary/styles/dark.css");

        this.cssElement = this.assignCSS();
        this.colorModal = await this.createModal(currentColor);

        // Append the context menu to the document body
        document.body.appendChild(this.colorModal);

        // Return a Promise that resolves when the user selects a color or cancels
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    assignCSS() {
        // Create a <style> element and set its textContent to the CSS string
        const styleElement = document.createElement('style');
        styleElement.textContent = this.cssString;
        document.head.appendChild(styleElement);

        return styleElement;
    }

    async createModal(currentColor) {
        // Create the color modal element
        const colorModal = document.createElement('div');
        colorModal.className = 'color-modal';

        // Create a title element
        const titleElement = document.createElement('div');
        titleElement.className = 'color-modal-title';
        titleElement.innerText = 'Select a Color';

        // Create a color picker input
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = rgbToHex(currentColor);

        // Add an input event listener to update the text input value when the color picker changes
        colorPicker.addEventListener('input', () => {
            colorValueInput.value = colorPicker.value;
        });

        // Create a text input for color value
        const colorValueInput = document.createElement('input');
        colorValueInput.type = 'text';
        colorValueInput.placeholder = "Input Hex Color here!";
        colorValueInput.value = currentColor;
        colorValueInput.className = 'color-value-input';

        // Add an input event listener to update the color picker and vice versa
        colorValueInput.addEventListener('input', () => {
            const enteredColor = colorValueInput.value;

            if (isValidColor(enteredColor)) {
                colorPicker.value = rgbToHex(enteredColor);
            }
        });

        // Create a submit button
        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';

        // Add a click event listener to the "submit button" to remove the modal
        submitButton.addEventListener('click', () => {
            this.submit(colorPicker);
        });

        // Append the title, color picker, text input, and submit button to the color modal
        colorModal.appendChild(titleElement);

        try {
            const optionals = await this.eventNote.getTaskOptionalInformation();

            const priority = optionals["10k Priority"];

            if (priority !== undefined && priority !== null ) {
                const divider = document.createElement('hr');
                divider.className = 'popup-divider';
                colorModal.appendChild(divider);

                const metadataInspection = this.createMetadataInspection(priority);
                colorModal.appendChild(metadataInspection)

                const divider2 = document.createElement('hr');
                divider2.className = 'popup-divider';

                colorModal.appendChild(divider2);
            }
        } catch (e) {
            console.error("Something went wrong trying to load priorities: ", e);
        }

        colorModal.appendChild(colorPicker);
        colorModal.appendChild(colorValueInput);
        colorModal.appendChild(submitButton);

        // Add a click event listener to the document body to detect clicks outside the modal
        document.body.addEventListener('click', (event) => {
            if (!colorModal.contains(event.target)) {
                this.cancel();
            }
        });

        // Add a right click event listener to the document body to detect clicks outside the modal
        document.body.addEventListener('contextmenu', (event) => {
            if (!colorModal.contains(event.target)) {
                this.cancel();
            }
        });

        return colorModal;
    }

    createMetadataInspection(priority) {
        // Create a container div
        const container = document.createElement('div');
        container.className = "edit-menu-inspection-container";

        const value = priority;

        // Create a metadata container div
        const metadataContainer = document.createElement('div');
        metadataContainer.classList.add('metadata-container');

        // Create a label element
        const label = document.createElement('span');
        label.textContent = "10k Priority "; // You can replace this with your desired label text
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

        return container;
    }

    submit = (colorPicker) => {
        const selectedColor = colorPicker.value;
        this.resolve(selectedColor); // Resolve the Promise with the selected color
        this.dispose();
    }

    cancel = () => {
        this.reject(new Error("Operation canceled")); // Reject the Promise with an error
        this.dispose();
    }

    dispose = () => {
        // Function to remove the context menu when clicking outside it
        document.body.removeEventListener('click', this.cancel);
        document.body.removeEventListener('contextmenu', this.cancel);

        // Check if this.colorModal exists and is a child of the document's <body>
        if (this.colorModal && this.colorModal.parentNode === document.body) {
            document.body.removeChild(this.colorModal);
        }

        // Check if this.cssElement exists and is a child of the document's <head>
        if (this.cssElement && this.cssElement.parentNode === document.head) {
            document.head.removeChild(this.cssElement);
        }
    }
}

module.exports = {
    ColorModal
}
