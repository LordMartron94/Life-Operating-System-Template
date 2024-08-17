const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory')];

const {ElementFactory} = require("../callout/ElementFactory");
const {roundToDecimals} = require('../utils');

class WeeklyNotesReport {
    constructor(ObsidianAPI) {
        this.elementFactory = new ElementFactory(ObsidianAPI);
    }

    getAverageWeeklyEffectiveness(effectivenessRows) {
        let sumEffectiveness = 0;

        for (let i = 0; i < effectivenessRows.length; i++) {
            const effectiveness = effectivenessRows[i];
            sumEffectiveness += effectiveness;
        }

        if (sumEffectiveness === 0) {
            return null;
        }

        return `${roundToDecimals((sumEffectiveness / effectivenessRows.length), 2)}%`;
    }

    buildRenderElement(pages) {
        const effectivenessRows = [];

        for (let page of pages) {
            effectivenessRows.push(page["Effectiveness"]);
        }

        let averageEffectiveness = this.getAverageWeeklyEffectiveness(effectivenessRows);

        if (averageEffectiveness === null)
            averageEffectiveness = "N/A";

        return this.elementFactory.createText(`Average Weekly Effectiveness: ${averageEffectiveness}`);
    }

}

module.exports = {
    WeeklyNotesReport
};