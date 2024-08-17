const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementSerializer.js')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory.js')];

const {ElementFactory} = require("./ElementFactory");
const {ElementSerializer} = require("./ElementSerializer");

class ElementUtils {
    constructor(obsidianAPI) {
        this.factory = new ElementFactory(obsidianAPI);
        this.serializer = new ElementSerializer();
    }

    async elementsToJson(elements = []) {
        const serializedElements = [];

        for (const element of elements) {
            const serializedElement = this.serializer.serializeElement(element);

            if (serializedElement !== null) {
                serializedElements.push(serializedElement);
            }
        }

        const jsonResult = {
            "elements": serializedElements
        };

        return JSON.stringify(jsonResult, null, 2);
    }

    async getElementByJsonData(jsonDataObject) {
        const elementType = jsonDataObject.type;

        return await this.getElementByType(elementType, jsonDataObject);
    }

    async getElementByType(elementType, itemData) {
        switch (elementType) {
            case 'divider':
                return this.factory.createDivider();
            case 'text':
                return this.factory.createText(itemData.content, itemData.colorOverride);
            case 'image':
                return await this.factory.createPngImage(itemData.path, itemData.imageClasses);
            case 'svg':
                return this.factory.createSvgIcon(itemData.svgSrc);
            case 'breakline':
                return this.factory.createBreakline();
            case 'title':
                return this.factory.createTitle(itemData.content);
            case 'list': {
                let subElements = [];

                for (let subElement of itemData.elements) {
                    subElements.push(await this.getElementByType(subElement.type, subElement));
                }

                return this.factory.createListContainer(itemData.content, subElements);
            }
            case 'toggle': {
                let subElements = [];

                for (let subElement of itemData.elements) {
                    subElements.push(await this.getElementByType(subElement.type, subElement));
                }

                return this.factory.createToggle(itemData.content, subElements);
            }
            case 'callout': {
                let subElements = [];

                for (let subElement of itemData.elements) {
                    subElements.push(await this.getElementByType(subElement.type, subElement));
                }

                return this.factory.createCompleteCallout(itemData.title, subElements, itemData.iconSVGPath, itemData.colorOverride, itemData.indentationLevel);
            }
            default:
                // Handle unknown element types or provide a default behavior.
                throw new Error("Unknown element type: " + elementType);
        }
    }
}

module.exports = {
    ElementUtils
}
