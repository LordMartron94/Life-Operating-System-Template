const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory')];

const {ElementFactory} = require("../callout/ElementFactory");
const {roundToDecimals} = require('../utils');

class DailyNotesReport {
    constructor(ObsidianAPI) {
        this.elementFactory = new ElementFactory(ObsidianAPI);
    }

    getNumberFromPercentageString(string) {
        return Number(string.replace("%", "")) / 100
    }

    getAverageSchedule(scheduleRows) {
        let sumSchedule = 0;

        for (let i = 0; i < scheduleRows.length; i++) {
            const scheduleRow = scheduleRows[i];
            const percentage = this.getNumberFromPercentageString(scheduleRow);
            sumSchedule += percentage;
        }

        if (sumSchedule === 0) {
            return null;
        }

        return `${roundToDecimals((sumSchedule / scheduleRows.length) * 100, 3)}%`;
    }

    getAverageOutput(outputRows) {
        let sumOutput = 0;

        for (let i = 0; i < outputRows.length; i++) {
            const scheduleRow = outputRows[i];
            const percentage = this.getNumberFromPercentageString(scheduleRow);
            sumOutput += percentage;
        }

        if (sumOutput === 0) {
            return null;
        }

        return `${roundToDecimals((sumOutput / outputRows.length) * 100, 3)}%`;
    }

    getAverageWorkStart(workStartHourRows, workStartMinuteRows) {
        let totalMinutes = 0;

        for (let i = 0; i < workStartHourRows.length; i++) {
            const workStartHour = workStartHourRows[i];
            const workStartMinute = workStartMinuteRows[i];
            const totalMinutesWorkStart = workStartHour * 60 + workStartMinute;
            totalMinutes += totalMinutesWorkStart;
        }

        const averageMinutes = totalMinutes / workStartHourRows.length;
        const averageHours = Math.floor(averageMinutes / 60);
        const remainderMinutes = Math.round(averageMinutes % 60);

        if (totalMinutes === 0)
            return null;

        return `${averageHours}h${remainderMinutes}m`;
    }

    getAverageHRV(hrvRows) {
        let sumHRV = 0;

        for (let i = 0; i < hrvRows.length; i++) {
            const effectiveness = hrvRows[i];
            sumHRV += effectiveness;
        }

        if (sumHRV === 0) {
            return null;
        }

        return `${roundToDecimals((sumHRV / hrvRows.length), 2)}%`;
    }

    getAverageRespiratory(respiratoryRows) {
        let sumRespiratory = 0;

        for (let i = 0; i < respiratoryRows.length; i++) {
            const effectiveness = respiratoryRows[i];
            sumRespiratory += effectiveness;
        }

        if (sumRespiratory === 0) {
            return null;
        }

        return `${roundToDecimals((sumRespiratory / respiratoryRows.length), 2)}%`;
    }

    buildRenderElementWeeklyView(pages) {
        const scheduleRows = [];
        const outputRows = [];
        const workStartHourRows = [];
        const workStartMinuteRows = [];

        for (let page of pages) {
            scheduleRows.push(page.schedule);
            outputRows.push(page.output);
            workStartHourRows.push(page["Wrk Start (Hr)"]);
            workStartMinuteRows.push(page["Wrk Start (Min)"]);
        }

        let averageSchedule = this.getAverageSchedule(scheduleRows);
        let outputAverage = this.getAverageOutput(outputRows);
        let averageWorkStart = this.getAverageWorkStart(workStartHourRows, workStartMinuteRows);

        averageSchedule = averageSchedule === null ? "N/A" : averageSchedule;
        outputAverage = outputAverage === null ? "N/A" : outputAverage;
        averageWorkStart = averageWorkStart === null ? "N/A" : averageWorkStart;

        return this.elementFactory.createText(`Average Schedule: ${averageSchedule}\nAverage Output: ${outputAverage}\nAverage Work Start: ${averageWorkStart}`);
    }

    buildRenderElementMonthlyView(pages) {
        const scheduleRows = [];
        const outputRows = [];
        const workStartHourRows = [];
        const workStartMinuteRows = [];
        const hrvRows = [];
        const respiratoryRows = [];

        for (let page of pages) {
            scheduleRows.push(page.schedule);
            outputRows.push(page.output);
            workStartHourRows.push(page["Wrk Start (Hr)"]);
            workStartMinuteRows.push(page["Wrk Start (Min)"]);
            hrvRows.push(page["HRV"]);
            respiratoryRows.push(page["Respiratory"]);
        }

        let averageSchedule = this.getAverageSchedule(scheduleRows);
        let outputAverage = this.getAverageOutput(outputRows);
        let averageWorkStart = this.getAverageWorkStart(workStartHourRows, workStartMinuteRows);
        let hrvAverage = this.getAverageHRV(hrvRows);
        let respiratoryAverage = this.getAverageRespiratory(respiratoryRows);

        averageSchedule = averageSchedule === null ? "N/A" : averageSchedule;
        outputAverage = outputAverage === null ? "N/A" : outputAverage;
        averageWorkStart = averageWorkStart === null ? "N/A" : averageWorkStart;
        hrvAverage = hrvAverage === null? "N/A" : hrvAverage;
        respiratoryAverage = respiratoryAverage === null? "N/A" : respiratoryAverage;

        return this.elementFactory.createText(`
        Average Schedule: ${averageSchedule}
        \nAverage Output: ${outputAverage}
        \nAverage Work Start: ${averageWorkStart}
        \nAverage HRV: ${hrvAverage}
        \nAverage Respiratory: ${respiratoryAverage}`);
    }

    buildRenderElement(pages, view = "Weekly") {
        if (view === "Weekly") {
            return this.buildRenderElementWeeklyView(pages);
        }
        else if (view === "Monthly") {
            return this.buildRenderElementMonthlyView(pages);
        }
    }

}

module.exports = {
    DailyNotesReport
};