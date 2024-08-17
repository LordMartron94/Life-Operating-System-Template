const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory.js')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementUtils.js')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/DataUtils.js')];

const {DataUtils} = require('./DataUtils.js');
const {ElementUtils} = require("./callout/ElementUtils");
const {ElementFactory} = require("./callout/ElementFactory");

class CalloutLib {
    constructor(container, app) {
        this.container = container;
        this.app = app;
        this.extrasPath = '1000 Extra';
        this.jsPath = '1000 Extra/JS';

        this.dataUtility = new DataUtils(this.app);
        this.elementUtility = new ElementUtils(this.app);
        this.factory = new ElementFactory(this.app);
    }

    async createElementsFromJSON(templateName) {
        try {
            const jsonData = await this.dataUtility.readJson(this.extrasPath + `/RenderTemplates/${templateName}.json`)
            const elementsJSON = jsonData["elements"];

            let elementsHTML = [];

            for (let i in elementsJSON) {
                elementsHTML.push(await this.elementUtility.getElementByJsonData(elementsJSON[i]));
            }

            return elementsHTML;
        } catch (error) {
            console.error("Error reading or parsing JSON data:", error);
        }
    }

    async render(templateName) {
        const elements = await this.createElementsFromJSON(templateName);

        for (let element of elements) {
            if (!this.container.contains(element)) {
                this.container.appendChild(element);
            }
        }
    }
}

module.exports = {
    CalloutLib
}
