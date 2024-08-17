const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils.js')];

const { UUIDv4 } = require('../utils.js'); // Import the UUIDv4 function

class ElementFactory {
    constructor(obsidianAPI) {
        this.obsidianAPI = obsidianAPI;
    }

    createDivider() {
        const dividerElement = document.createElement('div');
        dividerElement.classList.add('md-callout-divider');
        dividerElement.setAttribute('data-uuid', UUIDv4());
        return dividerElement;
    }

    createBreakline() {
        const breakElement = document.createElement('br');
        breakElement.classList.add('md-callout-br');
        breakElement.setAttribute('data-uuid', UUIDv4());
        return breakElement;
    }

    createTitle(title) {
        const titleElement = document.createElement('h2');
        titleElement.classList.add('md-callout-title');
        titleElement.textContent = title;
        titleElement.setAttribute('data-uuid', UUIDv4());
        return titleElement;
    }

    createText(text, colorOverride = null) {
        const textElement = document.createElement('p');
        const lines = text.split('\n');

        for (const line of lines) {
            const lineElement = document.createElement('p');
            lineElement.textContent = line;

            if (colorOverride) {
                lineElement.style.color = colorOverride;
            }

            textElement.appendChild(lineElement);
        }

        textElement.classList.add('md-callout-paragraph');
        textElement.setAttribute('data-uuid', UUIDv4());

        return textElement;
    }

    createSvgIcon(svgSource) {
        const svgImage = document.createElement('div');
        svgImage.classList.add('md-callout-icon');

        let backgroundImageURL;

        if (svgSource.startsWith('url("data:image/svg+xml;utf8,')) {
            backgroundImageURL = svgSource;
        } else {
            const encodedSvgString = encodeURIComponent(svgSource);
            backgroundImageURL = `url("data:image/svg+xml;utf8,${encodedSvgString}")`;
        }

        svgImage.style.backgroundImage = backgroundImageURL;
        svgImage.setAttribute('data-uuid', UUIDv4());

        return svgImage;
    }

    async createPngImage(imageSource, imageClasses = []) {
        try {
            let base64String;

            if (imageSource.startsWith("data:image/png;base64,")) {
                base64String = imageSource;
            } else {
                const binaryData = await this.obsidianAPI.vault.adapter.readBinary(imageSource);
                const blob = new Blob([binaryData], { type: 'image/png' });
                base64String = await this.readBlobAsDataURL(blob);
            }

            const imgElement = document.createElement('img');
            imgElement.classList.add('md-image-script-reference');
            imgElement.src = base64String;
            imgElement.setAttribute('data-uuid', UUIDv4());
            imageClasses.forEach((imageClass) => {
                imgElement.classList.add(imageClass);
            })

            return imgElement;
        } catch (error) {
            console.error("Error reading or converting the PNG file:", error);
            return null;
        }
    }

    readBlobAsDataURL(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(blob);
        });
    }

    createToggle(content, subElements = []) {
        const toggleElement = document.createElement('div');
        toggleElement.classList.add('md-callout-toggle');

        const labelWrapper = this.createLabelWrapper(content);
        toggleElement.appendChild(labelWrapper);

        subElements.forEach((subElement) => {
            toggleElement.appendChild(subElement);
            subElement.classList.add('md-callout-toggle-content-hidden');

            subElement.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });

        labelWrapper.addEventListener('click', () => {
            toggleElement.classList.toggle('md-callout-toggle-active');
            subElements.forEach((subElement) => {
                subElement.classList.toggle('md-callout-toggle-content-hidden');
            });
        });

        toggleElement.setAttribute('data-uuid', UUIDv4());
        return toggleElement;
    }

    createLabelWrapper(labelContent) {
        const labelWrapper = document.createElement('div');
        labelWrapper.classList.add('md-callout-label-wrapper');

        const textSpan = document.createElement('span');
        textSpan.textContent = labelContent;

        labelWrapper.appendChild(textSpan);
        labelWrapper.setAttribute('data-uuid', UUIDv4());

        return labelWrapper;
    }

    createListContainer(content, subElements = []) {
        const listElement = document.createElement('div');
        listElement.classList.add('md-list-element');

        const actualList = document.createElement('ul');

        const labelWrapper = this.createLabelWrapper(content);
        let tweakedSubElements = [labelWrapper];
        tweakedSubElements = tweakedSubElements.concat(subElements);

        tweakedSubElements.forEach((subElement) => {
            if (!subElement.classList.contains('md-list-element')) {
                // console.info('No nested list, adding: ', subElement, 'for element: ', listElement);
                const listItem = document.createElement('li');

                listItem.appendChild(subElement);
                listItem.classList.add('md-list-item');
                listItem.setAttribute('data-uuid', UUIDv4());

                actualList.appendChild(listItem);
            } else {
                // console.info('Nested list, adding: ', subElement, 'for element: ', listElement);
                subElement.classList.add('md-list-item');
                actualList.appendChild(subElement);
            }
        });

        listElement.appendChild(actualList);
        listElement.setAttribute('data-uuid', UUIDv4());
        return listElement;
    }

    createCalloutContainer() {
        const callout = document.createElement('div');
        callout.classList.add('md-callout');
        callout.setAttribute('data-uuid', UUIDv4());
        return callout;
    }

    async createCompleteCallout(title, subElements = [], iconSVGPath = null, colorOverride = null, indentationLevel = 1) {
        const callout = this.createCalloutContainer();

        if (iconSVGPath !== null) {
            if (iconSVGPath.startsWith('url("data:image/svg+xml;utf8,')) {
                const svgImage = this.createSvgIcon(iconSVGPath);
                callout.appendChild(svgImage);
            } else {
                const svgString = await this.obsidianAPI.vault.adapter.read(iconSVGPath);

                const svgImage = this.createSvgIcon(svgString);
                callout.appendChild(svgImage);
            }
        }

        const titleElement = this.createTitle(title);

        if (colorOverride) {
            titleElement.style.color = colorOverride;
        }

        callout.appendChild(titleElement);

        const leftMargin = `${45 * indentationLevel}px`;
        callout.style.marginLeft = leftMargin;
        callout.style.width = `calc(100% - ${leftMargin})`

        const content = document.createElement('div');
        content.classList.add('md-callout-content');

        subElements.forEach((subElement) => {
            content.appendChild(subElement);
        });

        content.style.width = `calc(100% - (${leftMargin} + ${leftMargin}) )`;
        callout.appendChild(content);

        callout.setAttribute('data-uuid', UUIDv4());
        callout.setAttribute('md-indent-level', indentationLevel);

        return callout;
    }
}

module.exports = {
    ElementFactory
}
