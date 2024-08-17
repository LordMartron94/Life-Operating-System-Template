// Ordered from simple to complex, for easy reading.
class ElementSerializer {
    constructor() {
        this.serialized = [];
    }

    //<editor-fold desc="SIMPLE"

    serializeDivider() {
        return {
            "type": "divider"
        };
    }

    serializeBreakline() {
        return {
            "type": "breakline"
        };
    }

    serializeTitle(title) {
        return {
            "type": "title",
            "content": title
        };
    }

    serializeText(textElement) {
        // console.log('Serializing text: ', textElement);

        return {
            "type": "text",
            "content": textElement.textContent,
            "colorOverride": textElement.style.color || null
        };
    }

    //</editor-fold>

    //<editor-fold desc="MEDIUM"

    serializeSvg(backgroundImage) {
        return {
            "type": "svg",
            "svgSrc": backgroundImage
        };
    }

    //</editor-fold>

    //<editor-fold desc="COMPLEX"

    serializePNGImage(pngImageElement) {
        if (pngImageElement.tagName !== 'IMG') {
            throw new Error("Invalid element for PNG image serialization");
        }

        const path = pngImageElement.getAttribute('src');
        const imageClasses = Array.from(pngImageElement.classList);

        return {
            "type": "image",
            "path": path,
            "imageClasses": imageClasses
        };
    }

    serializeToggle(toggleElement) {
        const content = toggleElement.querySelector('.md-callout-label-wrapper span').textContent;

        const subElements = [];
        const subElementDivs = toggleElement.querySelectorAll('.md-callout-toggle-content-hidden');

        subElementDivs.forEach((subElementDiv) => {
            const serialized = this.serializeElement(subElementDiv);

            if (serialized !== null) {
                subElements.push(serialized);
            }
        });

        return {
            "type": "toggle",
            "content": content,
            "elements": subElements
        };
    }

    serializeListItem(listItemElement) {
        const elementHTML = listItemElement.firstChild;

        if (elementHTML.classList.contains('md-callout-label-wrapper')) {
            return;
        }

        const element = this.serializeElement(elementHTML);

        return {
            "type": "list-item",
            "element": element
        };
    }

    serializeLabelWrapper(labelWrapperElement) {
        console.info('Serializing Label Wrapper: ', labelWrapperElement);
        return {
            "type": "label-wrapper",
            "text": labelWrapperElement.firstChild.textContent
        };
    }

    serializeList(listContainer) {
        const content = listContainer.querySelector('.md-callout-label-wrapper span').textContent;

        const subElements = [];
        const subElementDivs = listContainer.querySelectorAll('.md-list-item');

        subElementDivs.forEach((subElementDiv) => {
            const serialized = this.serializeElement(subElementDiv);

            if (serialized !== null && serialized !== undefined) {
                subElements.push(serialized);
            }
        });

        return {
            "type": "list",
            "content": content,
            "elements": subElements
        };
    }

    serializeCallout(calloutElement) {
        const titleElement = calloutElement.querySelector('.md-callout-title');
        const title = titleElement ? titleElement.textContent : "";

        const indentationLevel = titleElement.getAttribute('md-indent-level');

        const iconSVGElement = calloutElement.querySelector('.md-callout-icon');
        let iconSVGPath = null;

        if (iconSVGElement) {
            iconSVGPath = iconSVGElement.style.backgroundImage;
            // You may need to handle svgString differently if it contains special characters
        }

        const subElements = [];
        const subElementDivs = calloutElement.querySelectorAll('.md-callout > *');

        subElementDivs.forEach((subElementDiv) => {
            const serialized = this.serializeElement(subElementDiv);

            if (serialized !== null) {
                subElements.push(serialized);
            }
        });

        // Exclude the title and icon from the "elements" array
        const filteredElements = subElements.filter((element) => {
            return element.type !== 'title' && element.type !== 'svg';
        });

        return {
            "type": "callout",
            "title": title,
            "iconSVGPath": iconSVGPath,
            "indentationLevel": indentationLevel,
            "colorOverride": titleElement.style.color || null,
            "elements": filteredElements // Exclude only title and icon elements
        };
    }

    //</editor-fold>

    canSerialize(element) {
        // console.info('Checking element: ', element, 'Of type: ', typeof element);

        const elementId = element.getAttribute('data-uuid');
        // console.info('ID: ', elementId, 'For: ', element);

        return !this.serialized.contains(elementId);
    }

    serializeElement(element) {
        let elementSerialized;

        if (!this.canSerialize(element)) {
            // console.warn("Error, already serialized: ", element);
            return null;
        }

        // console.log("Serializing: ", element.classList)

        switch (true) {
            case element.classList.contains('md-list-element'):
                elementSerialized = this.serializeList(element);
                break;
            case element.classList.contains('md-list-item'):
                elementSerialized = this.serializeListItem(element);
                break;
            case element.classList.contains('md-callout-label-wrapper'):
                elementSerialized = this.serializeLabelWrapper(element);
                break;
            case element.classList.contains('md-callout-divider'):
                elementSerialized = this.serializeDivider();
                break;
            case element.classList.contains('md-callout-br'):
                elementSerialized = this.serializeBreakline();
                break;
            case element.classList.contains('md-callout-title'):
                elementSerialized = this.serializeTitle(element.textContent);
                break;
            case element.classList.contains('md-callout-icon'):
                elementSerialized = this.serializeSvg(element.style.backgroundImage);
                break;
            case element.classList.contains('md-image-script-reference'):
                elementSerialized = this.serializePNGImage(element);
                break;
            case element.classList.contains('md-callout-toggle'):
                elementSerialized = this.serializeToggle(element);
                break;
            case element.classList.contains('md-callout'):
                elementSerialized = this.serializeCallout(element);
                break;
            case element.classList.contains('md-callout-paragraph'):
                elementSerialized = this.serializeText(element);
                break;
            default:
                throw new Error(`Unknown element type: ${element.classList}`);
        }

        const elementId = element.getAttribute('data-uuid');
        this.serialized.push(elementId);

        return elementSerialized;
    }
}

module.exports = {
    ElementSerializer
}