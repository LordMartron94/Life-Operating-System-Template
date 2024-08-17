const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/DataUtils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory.js')];

const dataUtils = require('../DataUtils');
const {ElementFactory} = require("../callout/ElementFactory");
const {roundToDecimals} = require("../utils");

class DataInterface {
    constructor(ObsidianAPI, container) {
        this.dataUtils = new dataUtils.DataUtils(ObsidianAPI);
        this.elementFactory = new ElementFactory(ObsidianAPI);
        this.container = container;
    }

    renderDataAnalysis(xArray, yArray, maxDigitsForCoefficient = 8) {
        if (xArray.length !== yArray.length) {
            throw new Error("Array lengths are not equal!");
        }

        const hasExistingElements = Array.from(this.container.children).some(child => child.getAttribute('md-type') === 'correlationCoefficient');
        if (hasExistingElements) return;  // Exit if elements already exist

        const correlationCoefficient = this.dataUtils.calculateCorrelationCoefficient(xArray, yArray);
        const { m, b, e } = this.dataUtils.linearRegressionLeastSquares(xArray, yArray);

        this.appendCorrelationCoefficient(correlationCoefficient, maxDigitsForCoefficient);
        this.appendExtraData(xArray, yArray, correlationCoefficient, m, b, e, maxDigitsForCoefficient);
        this.appendDivider();
        this.appendMinMaxAndPercentiles(xArray, yArray);
        this.appendMovingAverages(xArray, yArray);
        this.appendDivider();
        this.appendMeanAndStdDev(xArray, yArray);
        this.appendRSquaredOrWarning(xArray, yArray);
        this.appendPValueOrWarning(xArray, yArray);
    }

// Helper function to append a divider element
    appendDivider() {
        const divider = this.elementFactory.createDivider();
        this.container.appendChild(divider);
    }

    appendCorrelationCoefficient(correlationCoefficient, maxDigits) {
        const element = this.elementFactory.createText(`Correlation Coefficient: ${correlationCoefficient.toFixed(maxDigits)}`);
        element.setAttribute('md-type', 'correlationCoefficient');
        this.container.appendChild(element);
    }

    appendExtraData(xArray, yArray, correlationCoefficient, m, b, e, maxDigits) {
        const observations = xArray.length;
        const direction = this.getCorrelationDirection(correlationCoefficient);
        const strength = this.getCorrelationStrength(correlationCoefficient);
        const f = `${m.toFixed(maxDigits)}x + ${b.toFixed(maxDigits)}`;

        const extraDataElement = this.elementFactory.createText(
            `Observations: ${observations}\nDirection: ${direction}\nStrength: ${strength}\nFunction by Linear Regression (Least Squares): ${f}\nError (Root Mean Squared Error): ${e}`,
            "rgb(117, 117, 117)"
        );
        extraDataElement.setAttribute('md-type', 'extraDataElement');
        this.container.appendChild(extraDataElement);
    }

    getCorrelationDirection(correlationCoefficient) {
        if (correlationCoefficient > 0) return "Positive";
        if (correlationCoefficient < 0) return "Negative";
        return "No relation";
    }

    getCorrelationStrength(correlationCoefficient) {
        const checkRange = (lowest, value, highest) => value >= lowest && value <= highest;

        if (checkRange(0, correlationCoefficient, 0.1) || checkRange(-0.1, correlationCoefficient, 0)) {
            return "No correlation";
        } else if (checkRange(0.1, correlationCoefficient, 0.3) || checkRange(-0.3, correlationCoefficient, -0.1)) {
            return "Low correlation";
        } else if (checkRange(0.3, correlationCoefficient, 0.5) || checkRange(-0.5, correlationCoefficient, -0.3)) {
            return "Medium correlation";
        } else if (checkRange(0.5, correlationCoefficient, 0.7) || checkRange(-0.7, correlationCoefficient, -0.5)) {
            return "High correlation";
        } else if (checkRange(0.7, correlationCoefficient, 1.1) || checkRange(-1.1, correlationCoefficient, -0.7)) {
            return "Very high correlation";
        } else {
            return "Undefined"; // Handle cases outside of the normal range
        }
    }

    appendMeanAndStdDev(xArray, yArray) {
        const xMean = this.dataUtils.calculateMean(xArray);
        const xStdDev = this.dataUtils.calculateStdDev(xArray);
        const yMean = this.dataUtils.calculateMean(yArray);
        const yStdDev = this.dataUtils.calculateStdDev(yArray);

        const element = this.elementFactory.createText(
            `X (Mean ± Std Dev): ${xMean.toFixed(2)} ± ${xStdDev.toFixed(2)}\n` +
            `Y (Mean ± Std Dev): ${yMean.toFixed(2)} ± ${yStdDev.toFixed(2)}`,
            "rgb(117, 117, 117)"
        );
        element.setAttribute('md-type', 'meanStdDev');
        this.container.appendChild(element);
    }

    appendRSquaredOrWarning(xArray, yArray) {
        if (xArray.length > 2) {
            const rSquared = this.dataUtils.calculateRSquared(xArray, yArray);
            const element = this.elementFactory.createText(`R-squared: ${rSquared.toFixed(4)} (${roundToDecimals(rSquared * 100, 3)}%)`, "rgb(117, 117, 117)");
            element.setAttribute('md-type', 'rSquared');
            this.container.appendChild(element);
        } else {
            const warningElement = this.elementFactory.createText("R-squared not calculated due to insufficient data (2 or fewer observations)", "rgb(255, 165, 0)");
            warningElement.setAttribute('md-type', 'rSquaredWarning');
            this.container.appendChild(warningElement);
        }
    }

    appendPValueOrWarning(xArray, yArray) {
        const pValue = this.dataUtils.calculatePValue(xArray, yArray);

        if (pValue !== null && !isNaN(pValue)) {
            let pValueDisplay = pValue < 0.001 ? pValue.toExponential(2) : pValue.toFixed(3);
            let significanceLevel = pValue < 0.05 ? " (statistically significant)" : " (statistically insignificant)";
            const pValueElement = this.elementFactory.createText(`P-value (approximate): ${pValueDisplay}${significanceLevel}`, "rgb(117, 117, 117)");
            pValueElement.setAttribute('md-type', 'pValue');
            this.container.appendChild(pValueElement);
        } else {
            const warningElement = this.elementFactory.createText("P-value not calculated due to insufficient data (2 or fewer observations)", "rgb(255, 165, 0)");
            warningElement.setAttribute('md-type', 'pValueWarning');
            this.container.appendChild(warningElement);
        }
    }

    appendMinMaxAndPercentiles(xArray, yArray) {
        const xMin = Math.min(...xArray);
        const xMax = Math.max(...xArray);
        const yMin = Math.min(...yArray);
        const yMax = Math.max(...yArray);

        const minMaxElement = this.elementFactory.createText(`X (Min, Max): ${roundToDecimals(xMin, 2)}, ${roundToDecimals(xMax, 2)} Y (Min, Max): ${roundToDecimals(yMin, 2)}, ${roundToDecimals(yMax, 2)}`, "rgb(117, 117, 117)");
        minMaxElement.setAttribute('md-type', 'minMax');
        this.container.appendChild(minMaxElement);

        const xPercentiles = [25, 50, 75].map(p => this.dataUtils.calculatePercentile(xArray, p));
        const yPercentiles = [25, 50, 75].map(p => this.dataUtils.calculatePercentile(yArray, p));

        const percentileElement = this.elementFactory.createText(
            `X (25th, 50th, 75th %ile): ${xPercentiles.map(p => p.toFixed(2)).join(", ")}\n` +
            `Y (25th, 50th, 75th %ile): ${yPercentiles.map(p => p.toFixed(2)).join(", ")}`,
            "rgb(117, 117, 117)"
        );
        percentileElement.setAttribute('md-type', 'percentiles');
        this.container.appendChild(percentileElement);
    }

    appendMovingAverages(xArray, yArray) {
        const xMovingAvg7Days = this.dataUtils.calculateMovingAverage(xArray, 7);
        const xMovingAvg30Days = this.dataUtils.calculateMovingAverage(xArray, 30);
        const yMovingAvg7Days = this.dataUtils.calculateMovingAverage(yArray, 7);
        const yMovingAvg30Days = this.dataUtils.calculateMovingAverage(yArray, 30);

        // Check if the container already has the moving averages element
        const hasMovingAvg = Array.from(this.container.children).some(child => child.getAttribute('md-type') === 'movingAverages');
        if (hasMovingAvg) return; // Exit if the element already exists

        const element = this.elementFactory.createText(
            `X (7-day Moving Avg): ${xMovingAvg7Days.map(avg => avg.toFixed(2)).join(", ")}\n` +
            `X (30-day Moving Avg): ${xMovingAvg30Days.map(avg => avg.toFixed(2)).join(", ")}\n` +
            `Y (7-day Moving Avg): ${yMovingAvg7Days.map(avg => avg.toFixed(2)).join(", ")}\n` +
            `Y (30-day Moving Avg): ${yMovingAvg30Days.map(avg => avg.toFixed(2)).join(", ")}\n`,
            "rgb(117, 117, 117)"
        );
        element.setAttribute('md-type', 'movingAverages');
        this.container.appendChild(element);
    }
}

module.exports = {
    DataInterface
};

