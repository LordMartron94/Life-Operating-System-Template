class DataUtils {
    constructor(obsidianAPI) {
        this.obsidianAPI = obsidianAPI;
    }

    async readJson(jsonPath) {
        const jsonData = await this.obsidianAPI.vault.adapter.read(jsonPath);

        return await JSON.parse(jsonData);
    }

    async writeJson(serialized, jsonPath) {
        await this.obsidianAPI.vault.adapter.write(jsonPath, serialized);
    }

    calculateCorrelationCoefficient(xArray, yArray) {
        if (xArray.length !== yArray.length || xArray.length <= 1) {
            throw new Error("Insufficient data or array lengths not equal!");
        }

        try {
            const observations = xArray.length;
            let sumX = 0;
            let sumY = 0;
            let sumXY = 0;
            let sumXSqr = 0;
            let sumYSqr = 0;

            for (let x of xArray) {
                const xI = xArray.indexOf(x);
                const y = yArray[xI];

                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumXSqr += x * x;
                sumYSqr += y * y;
            }

            const top = (observations * sumXY) - (sumX * sumY);
            const bottom = Math.sqrt(((observations * sumXSqr) - Math.pow(sumX, 2)) * ((observations * sumYSqr) - Math.pow(sumY, 2)));

            if (bottom === 0) {
                return 0; // Or you could throw an error to indicate no correlation can be calculated
            }

            return top / bottom;
        } catch (e) {
            throw new Error("Something went wrong trying to calculate coefficient: ", e);
        }
    }

    meanSquaredError(yPredictedArray, yExpectedArray) {
        if (yPredictedArray.length !== yExpectedArray.length) {
            throw new Error("Array lengths are not equal!");
        }

        let sumYSqr = 0;

        for (let y of yPredictedArray) {
            const yI = yPredictedArray.indexOf(y);
            let yExpected = yExpectedArray[yI];

            sumYSqr += Math.pow(y - yExpected, 2);
        }

        return sumYSqr / yExpectedArray.length;
    }

    rootMeanSquaredError(yPredictedArray, yExpectedArray) {
        return Math.sqrt(this.meanSquaredError(yPredictedArray, yExpectedArray));
    }

    linearRegressionLeastSquares(xArray, yArray) {
        if (xArray.length !== yArray.length) {
            throw new Error("Array lengths are not equal!");
        }

        const observations = xArray.length;
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXSqr = 0;

        for (let x of xArray) {
            const xI = xArray.indexOf(x);
            const y = yArray[xI];

            sumX += x;
            sumY += y;
            sumXY += (x * y);
            sumXSqr += (x * x);
        }

        const top = (observations * sumXY) - (sumX * sumY);
        const bottom = (observations * sumXSqr) - Math.pow(sumX, 2);
        const m = top / bottom;

        const topTwo = sumY - (m * sumX);
        const b = topTwo / observations;

        let yPredicted = [];

        for (let x of xArray) {
            yPredicted.push((m * x) + b);
        }

        const e = this.rootMeanSquaredError(yPredicted, yArray);

        return {
            m,
            b,
            e
        };
    }

    calculateMean(data) {
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }

    calculateStdDev(data) {
        const mean = this.calculateMean(data);
        const squaredDiffs = data.map(value => Math.pow(value - mean, 2));
        const variance = this.calculateMean(squaredDiffs);
        return Math.sqrt(variance);
    }

    calculateRSquared(xArray, yArray) {
        const { m, b } = this.linearRegressionLeastSquares(xArray, yArray);

        const yMean = this.calculateMean(yArray);
        const totalSumSquares = yArray.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
        const residualSumSquares = yArray.reduce((sum, y, i) => sum + Math.pow(y - (m * xArray[i] + b), 2), 0);

        return 1 - (residualSumSquares / totalSumSquares);
    }

    calculatePValue(xArray, yArray) {
        const { m, b } = this.linearRegressionLeastSquares(xArray, yArray);
        const correlationCoefficient = this.calculateCorrelationCoefficient(xArray, yArray);
        const n = xArray.length;

        // Calculate the standard error of the slope (SEm)
        const residualSumSquares = yArray.reduce((sum, y, i) => sum + Math.pow(y - (m * xArray[i] + b), 2), 0);
        const sumXSqr = xArray.reduce((sum, x) => sum + Math.pow(x, 2), 0);
        const SEm = Math.sqrt(residualSumSquares / ((n - 2) * (sumXSqr - Math.pow(this.calculateMean(xArray), 2) * n)));

        // Calculate the t-statistic
        const tStatistic = m / SEm;

        // Estimate the p-value using the Student's t-distribution
        // This is an approximation, as the exact p-value requires a complex integral
        const degreesOfFreedom = n - 2;
        return this.approximatePValueFromTStatistic(tStatistic, degreesOfFreedom);
    }

    // Helper function to approximate p-value from t-statistic
    approximatePValueFromTStatistic(t, df) {
        // This is a rough approximation, and its accuracy decreases for large degrees of freedom
        // You could refine this with a more precise algorithm if needed
        if (t < 0) t = -t; // p-value is symmetrical
        const x = df / (df + t * t);
        const a = 0.5 * (1 + Math.sign(df % 2) * Math.sqrt(x));
        return 2 * (1 - a);
    }

    calculatePercentile(data, percentile) {
        if (percentile < 0 || percentile > 100) {
            throw new Error("Percentile must be between 0 and 100");
        }

        const sortedData = [...data].sort((a, b) => a - b); // Sort a copy of the data
        const index = (percentile / 100) * (sortedData.length - 1); // Calculate the index

        if (Math.floor(index) === index) {
            // Percentile falls exactly on an element's index
            return sortedData[index];
        } else {
            // Percentile falls between two elements
            const lowerIndex = Math.floor(index);
            const upperIndex = lowerIndex + 1;
            const lowerValue = sortedData[lowerIndex];
            const upperValue = sortedData[upperIndex];
            const fraction = index - lowerIndex;
            return lowerValue + fraction * (upperValue - lowerValue); // Linear interpolation
        }
    }

    // analyzeSeasonality(data, periodLength) {
    //     const numPeriods = Math.floor(data.length / periodLength);
    //     const seasonalAverages = [];
    //
    //     for (let i = 0; i < periodLength; i++) {
    //         const periodData = [];
    //         for (let j = 0; j < numPeriods; j++) {
    //             const index = j * periodLength + i;
    //             if (index < data.length) {
    //                 periodData.push(data[index]);
    //             }
    //         }
    //         const average = periodData.reduce((sum, val) => sum + val, 0) / periodData.length;
    //         seasonalAverages.push(average);
    //     }
    //
    //     return seasonalAverages;
    // }

    calculateMovingAverage(data, windowSize) {
        const movingAverages = [];

        for (let i = 0; i < data.length - windowSize + 1; i++) {
            const window = data.slice(i, i + windowSize);
            const average = window.reduce((sum, val) => sum + val, 0) / windowSize;
            movingAverages.push(average);
        }

        return movingAverages;
    }
}

module.exports = {
    DataUtils
}