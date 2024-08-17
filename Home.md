---
tags:
  - dashboard
cssclasses:
  - dashboard
  - md-bigview
aliases:
  - Command Center
  - Palace
---
# [[Home]]

## Schwerpunkt
![[Schwerpunkt#Schwerpunkt]]

## FOCUS & ALIGNMENT
For the day-to-day, hour-to-hour overview of pure focus, see the [[Focus Zone]].

For more long-term planning and larger scale operations, visit the [[Alignment Zone]].

```meta-bind-button
label: New Action Item
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Focus/New Action Item.md
    folderPath: 3000 Core Pipelines/Action Items
    fileName: ""
    openNote: true

```

## Important Analyses
For more info on the meanings of several measures see: [[Meaning of Statistical Data]].

For more in-depth *sleep* analysis, see: [[Sleep Overview]]

- **Sleep Score & Daily Output**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	function getNumberFromPercentageString(string) {  
	    return Number(string.replace("%", "")) 
	}
	
	function buildArrays(xPagesArray, yPagesArray, xLabel, yLabel) {
	    const xArray = [];
	    const yArray = [];
	
	    // Create sets of date strings from each array (format to ensure consistent comparison)
	    const xDates = new Set(xPagesArray.map(p => p["Date"].toISODate())); // Convert to ISO format
	    const yDates = new Set(yPagesArray.map(p => p["Date"].toISODate()));
	
	    // Find the intersection of the two sets
	    const commonDates = new Set([...xDates].filter(date => yDates.has(date)));
	
	    // Filter the original arrays based on common dates
	    for (const page of xPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            xArray.push(page[xLabel]);
	        }
	    }
	
	    for (const page of yPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            yArray.push(page[yLabel]);
	        }
	    }
	
	    return [xArray, yArray];
	}
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const sleepPages = dv.pages('"4500 Data Tracking/Sleep"');
	const sleepPagesArray = sleepPages.array();
	
	const dailyPages = dv.pages('"4000 Supplementary Pipelines/Reflection/Daily"');
	const dailyPagesArray = dailyPages.array();
	
	const arrays = buildArrays(sleepPagesArray, dailyPagesArray, "Sleep Score", "Output");
	const xArray = arrays[0];
	const yArray = arrays[1];
	
	let changedYArray = [];
	
	for (let yV of yArray) {
		changedYArray.push(getNumberFromPercentageString(yV));
	}
	
	dataInterface.renderDataAnalysis(xArray, changedYArray);
	```
- **Sleep Score & Daily Schedule**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	function getNumberFromPercentageString(string) {  
	    return Number(string.replace("%", "")) 
	}
	
	function buildArrays(xPagesArray, yPagesArray, xLabel, yLabel) {
	    const xArray = [];
	    const yArray = [];
	
	    // Create sets of date strings from each array (format to ensure consistent comparison)
	    const xDates = new Set(xPagesArray.map(p => p["Date"].toISODate())); // Convert to ISO format
	    const yDates = new Set(yPagesArray.map(p => p["Date"].toISODate()));
	
	    // Find the intersection of the two sets
	    const commonDates = new Set([...xDates].filter(date => yDates.has(date)));
	
	    // Filter the original arrays based on common dates
	    for (const page of xPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            xArray.push(page[xLabel]);
	        }
	    }
	
	    for (const page of yPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            yArray.push(page[yLabel]);
	        }
	    }
	
	    return [xArray, yArray];
	}
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const sleepPages = dv.pages('"4500 Data Tracking/Sleep"');
	const sleepPagesArray = sleepPages.array();
	
	const dailyPages = dv.pages('"4000 Supplementary Pipelines/Reflection/Daily"');
	const dailyPagesArray = dailyPages.array();
	
	const arrays = buildArrays(sleepPagesArray, dailyPagesArray, "Sleep Score", "Schedule");
	const xArray = arrays[0];
	const yArray = arrays[1];
	
	let changedYArray = [];
	
	for (let yV of yArray) {
		changedYArray.push(getNumberFromPercentageString(yV));
	}
	
	dataInterface.renderDataAnalysis(xArray, changedYArray);
	```
- **Sleep Score & Daily Readiness Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	function getNumberFromPercentageString(string) {  
	    return Number(string.replace("%", "")) 
	}
	
	function buildArrays(xPagesArray, yPagesArray, xLabel, yLabel) {
	    const xArray = [];
	    const yArray = [];
	
	    // Create sets of date strings from each array (format to ensure consistent comparison)
	    const xDates = new Set(xPagesArray.map(p => p["Date"].toISODate())); // Convert to ISO format
	    const yDates = new Set(yPagesArray.map(p => p["Date"].toISODate()));
	
	    // Find the intersection of the two sets
	    const commonDates = new Set([...xDates].filter(date => yDates.has(date)));
	
	    // Filter the original arrays based on common dates
	    for (const page of xPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            xArray.push(page[xLabel]);
	        }
	    }
	
	    for (const page of yPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            yArray.push(page[yLabel]);
	        }
	    }
	
	    return [xArray, yArray];
	}
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const sleepPages = dv.pages('"4500 Data Tracking/Sleep"');
	const sleepPagesArray = sleepPages.array();
	
	const dailyPages = dv.pages('"4000 Supplementary Pipelines/Reflection/Daily"');
	const dailyPagesArray = dailyPages.array();
	
	const arrays = buildArrays(sleepPagesArray, dailyPagesArray, "Sleep Score", "Readiness Score");
	const xArray = arrays[0];
	const yArray = arrays[1];
	
	dataInterface.renderDataAnalysis(xArray, yArray);
	```
- **Sleep Score & Daily Effectiveness Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	function getNumberFromPercentageString(string) {  
	    return Number(string.replace("%", "")) 
	}
	
	function buildArrays(xPagesArray, yPagesArray, xLabel, yLabel) {
	    const xArray = [];
	    const yArray = [];
	
	    // Create sets of date strings from each array (format to ensure consistent comparison)
	    const xDates = new Set(xPagesArray.map(p => p["Date"].toISODate())); // Convert to ISO format
	    const yDates = new Set(yPagesArray.map(p => p["Date"].toISODate()));
	
	    // Find the intersection of the two sets
	    const commonDates = new Set([...xDates].filter(date => yDates.has(date)));
	
	    // Filter the original arrays based on common dates
	    for (const page of xPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            xArray.push(page[xLabel]);
	        }
	    }
	
	    for (const page of yPagesArray) {
	        if (commonDates.has(page["Date"].toISODate())) {
	            yArray.push(page[yLabel]);
	        }
	    }
	
	    return [xArray, yArray];
	}
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const sleepPages = dv.pages('"4500 Data Tracking/Sleep"');
	const sleepPagesArray = sleepPages.array();
	
	const dailyPages = dv.pages('"4000 Supplementary Pipelines/Reflection/Daily"');
	const dailyPagesArray = dailyPages.array();
	
	const arrays = buildArrays(sleepPagesArray, dailyPagesArray, "Sleep Score", "Effectiveness");
	const xArray = arrays[0];
	const yArray = arrays[1];

	const xArrayChanged = [];
	const yArrayChanged = [];
	
	let i = 0;

	for (let yOr of yArray) {
	    if (yOr !== null && yOr !== "" && yOr >= 0) {
	        const xOr = xArray[i];
	        yArrayChanged.push(yOr);
	        xArrayChanged.push(xOr);
	    }
	    
	    i++;
	}

	dataInterface.renderDataAnalysis(xArrayChanged, yArrayChanged);
	```
## HELP 
Following is a list of helpful pages to reference for some background info or FAQ in general.

**Q: What sources have you used to synthesize this exceptional system?**
*A: See [[Bibliography for the System]]*

**Q: Where can I find additional information about the concepts used in the system?**
*A: See [[Index of Background Concepts]]*

**Q: I don't know what I should fill in for X field of Y template.**
*A: See [[Options in Metadata]]*

**Q: I want to know what a certain input field means...**
*A: See [[Taxonomy]]*