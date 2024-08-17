const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory')];

const {ElementFactory} = require("../callout/ElementFactory");
const {roundToDecimals, getAverageHours} = require('../utils');

class SleepNotesReport {
    constructor(ObsidianAPI) {
        this.elementFactory = new ElementFactory(ObsidianAPI);
    }

    getHabitProgress(page) {
        const sound = page["Sound"];
        const caffeine = page["Caffeine"];
        const routine = page["Routine"];
        const incentive = page["Incentive"];
        const bedSpace = page["Bed Space"];
        const light = page["Light"];
        const exercise = page["Exercise"];
        const devices = page["Devices"];
        const napping = page["Napping"];
        const consistency = page["Consistency"];

        const total = sound + caffeine + routine + incentive + bedSpace + light + exercise + devices + napping + consistency
        const progress = total / 10 // Average
        return progress
    }

    getAverageHabitProgress(pages) {
        let habitSum = 0;

        for (let page of pages) {
            habitSum += this.getHabitProgress(page);
        }

        if (habitSum === 0) {
            return null;
        }

        return `${roundToDecimals((habitSum / pages.length) * 100, 3)}%`;
    }

    buildRenderElement(pages) {
        const toSleepHourRows = [];
        const toSleepMinRows = [];

        const awakeHourRows = [];
        const awakeMinuteRows = [];

        const sleepScoreRows = [];

        const totalSleepHourRows = [];
        const totalSleepMinRows = [];

        const remSleepHourRows = [];
        const remSleepMinRows = [];

        const lightSleepHourRows = [];
        const lightSleepMinRows = [];

        const deepSleepHourRows = [];
        const deepSleepMinRows = [];

        const avgBloodOxygenRows = [];
        const restingHeartRateRows = [];
        const sleepEfficiencyRows = [];

        for (let page of pages) {
            toSleepHourRows.push(page["To Sleep (Hr)"]);
            toSleepMinRows.push(page["To Sleep (Min)"]);

            awakeHourRows.push(page["Awake (Hr)"]);
            awakeMinuteRows.push(page["Awake (Min)"]);

            sleepScoreRows.push(page["Sleep Score"]);

            totalSleepHourRows.push(page["Total Sleep (Hr)"]);
            totalSleepMinRows.push(page["Total Sleep (Min)"]);

            remSleepHourRows.push(page["REM Sleep (Hr)"]);
            remSleepMinRows.push(page["REM Sleep (Min)"]);

            lightSleepHourRows.push(page["Light Sleep (Hr)"]);
            lightSleepMinRows.push(page["Light Sleep (Min)"]);

            deepSleepHourRows.push(page["Deep Sleep (Hr)"]);
            deepSleepMinRows.push(page["Deep Sleep (Min)"]);

            avgBloodOxygenRows.push(page["Avg. Blood Oxygen"]);
            restingHeartRateRows.push(page["Resting HR"]);
            sleepEfficiencyRows.push(page["Sleep Efficiency"]);
        }

        let averageToSleepHours = getAverageHours(toSleepHourRows, toSleepMinRows);
        let averageAwakeHours = getAverageHours(awakeHourRows, awakeMinuteRows);
        let averageSleepScore = roundToDecimals(sleepScoreRows.reduce((a, b) => a + b, 0) / sleepScoreRows.length, 2);
        let averageTotalSleepHours = getAverageHours(totalSleepHourRows, totalSleepMinRows);
        let averageRemSleepHours = getAverageHours(remSleepHourRows, remSleepMinRows);
        let averageLightSleepHours = getAverageHours(lightSleepHourRows, lightSleepMinRows);
        let averageDeepSleepHours = getAverageHours(deepSleepHourRows, deepSleepMinRows);
        let averageAvgBloodOxygen = roundToDecimals(avgBloodOxygenRows.reduce((a, b) => a + b, 0) / avgBloodOxygenRows.length, 2);
        let averageRestingHeartRate = roundToDecimals(restingHeartRateRows.reduce((a, b) => a + b, 0) / restingHeartRateRows.length, 2);
        let averageSleepEfficiency = roundToDecimals(sleepEfficiencyRows.reduce((a, b) => a + b, 0) / sleepEfficiencyRows.length, 2);

        let averageHabitProgress = this.getAverageHabitProgress(pages);

        averageHabitProgress = averageHabitProgress === null? "N/A" : averageHabitProgress;
        averageToSleepHours = averageToSleepHours === null? "N/A" : averageToSleepHours;
        averageAwakeHours = averageAwakeHours === null? "N/A" : averageAwakeHours;
        averageSleepScore = (averageSleepScore === null || isNaN(averageSleepScore)) ? "N/A" : averageSleepScore;
        averageTotalSleepHours = averageTotalSleepHours === null? "N/A" : averageTotalSleepHours;
        averageRemSleepHours = averageRemSleepHours === null? "N/A" : averageRemSleepHours;
        averageLightSleepHours = averageLightSleepHours === null? "N/A" : averageLightSleepHours;
        averageDeepSleepHours = averageDeepSleepHours === null? "N/A" : averageDeepSleepHours;
        averageAvgBloodOxygen = (averageAvgBloodOxygen === null || isNaN(averageAvgBloodOxygen)) ? "N/A" : averageAvgBloodOxygen;
        averageRestingHeartRate = (averageRestingHeartRate === null || isNaN(averageRestingHeartRate)) ? "N/A" : averageRestingHeartRate;
        averageSleepEfficiency = (averageSleepEfficiency === null || isNaN(averageSleepEfficiency)) ? "N/A" : averageSleepEfficiency;

        return this.elementFactory.createText(`
        Average Habit Progress: ${averageHabitProgress}
        \nAverage To Sleep Time: ${averageToSleepHours}
        \nAverage Awake Time: ${averageAwakeHours}
        \nAverage Sleep Score: ${averageSleepScore}
        \nAverage Total Sleep Time: ${averageTotalSleepHours}
        \nAverage REM Sleep Time: ${averageRemSleepHours}
        \nAverage Light Sleep Time: ${averageLightSleepHours}
        \nAverage Deep Sleep Time: ${averageDeepSleepHours}
        \nAverage Blood Oxygen: ${averageAvgBloodOxygen}%
        \nAverage Resting Heart Rate: ${averageRestingHeartRate}
        \nAverage Sleep Efficiency: ${averageSleepEfficiency}%`);
    }

}

module.exports = {
   SleepNotesReport
};