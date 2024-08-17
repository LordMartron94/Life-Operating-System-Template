---
tags:
  - dashboard
cssclasses:
  - md-bigview
  - dashboard
---
# [[Sleep Overview]]
```ad-important
Due to the fact that this is a dashboard... You need to open this in reading view in order for the formatting to work!

```


- **To Sleep & Awake Times**
	```tracker
	searchType: frontmatter, dvField, dvField
	searchTarget: Date, ToSleepCalc, AwakeCalc
	
	xDataset: 0
	
	datasetName: Date, ToSleep, Awake
	dateFormat: iso-8601
	
	folder: "4500 Data Tracking/Sleep"
	fixedScale: 0.8
	
	line:
		title: To Sleep & Awake Times over Time
		fillGap: true
		lineColor: yellow, yellow, red
		yMin: 4
	
		xAxisLabel: Date
	
		yAxisLocation: left, left, left
		yAxisLabel: ToSleep, Awake
		yAxisUnit: hours
	
		showLegend: true
	```
- **Sleep Time**
	```tracker
	searchType: frontmatter, dvField
	searchTarget: Date, SleepCalc
	
	xDataset: 0
	
	datasetName: Date, Sleep Time
	dateFormat: iso-8601
	folder: "4500 Data Tracking/Sleep"
	fixedScale: 0.8
	
	line:
		title: Sleep Time over Time
		fillGap: true
		lineColor: yellow, blue
	
		xAxisLabel: Date
	
		yAxisLocation: left, left
		yAxisLabel: Sleep
		yAxisUnit: hours
	
		showLegend: true
	```
- **Sleep Efficiency**
	```tracker
	searchType: frontmatter
	searchTarget: Date, Sleep Efficiency
	
	xDataset: 0
	
	datasetName: Date, Sleep Efficiency
	dateFormat: iso-8601
	folder: "4500 Data Tracking/Sleep"
	fixedScale: 0.8
	
	line:
		title: Sleep Efficiency over Time
		fillGap: true
		lineColor: yellow, green
	
		xAxisLabel: Date
	
		yAxisLocation: left, left
		yAxisLabel: Sleep Efficiency
		yAxisUnit: percentage

		yMin: 0
		yMax: 100
	
		showLegend: true
	```
- **Heart Rate Variablity**
	```tracker
	searchType: frontmatter
	searchTarget: Date, HRV
	
	xDataset: 0
	
	datasetName: Date, Heart Rate Variability
	dateFormat: iso-8601
	folder: "4000 Supplementary Pipelines/Reflection/Daily"
	fixedScale: 0.8
	
	line:
		title: Heart Rate Variability over Time
		fillGap: true
		lineColor: yellow, brown
	
		xAxisLabel: Date
	
		yAxisLocation: left, left
		yAxisLabel: Resting Heart Rate
		yAxisUnit: ms
	
		showLegend: true
	```
- **Resting Heart Rate**
	```tracker
	searchType: frontmatter
	searchTarget: Date, Resting HR
	
	xDataset: 0
	
	datasetName: Date, Resting Heart Rate
	dateFormat: iso-8601
	folder: "4500 Data Tracking/Sleep"
	fixedScale: 0.8
	
	line:
		title: Resting Heart Rate over Time
		fillGap: true
		lineColor: yellow, brown
	
		xAxisLabel: Date
	
		yAxisLocation: left, left
		yAxisLabel: Resting Heart Rate
		yAxisUnit: bpm
	
		showLegend: true
	```
- **Sleep Score*
	```tracker
	searchType: frontmatter
	searchTarget: Date, Sleep Score
	
	xDataset: 0
	
	datasetName: Date, Sleep Score
	dateFormat: iso-8601
	folder: "4500 Data Tracking/Sleep"
	fixedScale: 0.8
	
	line:
		title: Sleep Score over Time
		fillGap: true
		lineColor: yellow, gold
	
		xAxisLabel: Date
	
		yAxisLocation: left, left
		yAxisLabel: Sleep Score
		yMin: 0
		yMax: 100
	
		showLegend: true
	```
---

## Data Analysis
For an explanation, see: [[Meaning of Statistical Data]]

- **Sleep Duration and Sleep Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const pages = dv.pages('"4500 Data Tracking/Sleep"');
	const pagesArray = pages.array();
	
	let sleepScoreArray = [];
	let sleepDurationArray = [];
	
	for (let page of pagesArray) {
		sleepScoreArray.push(page["Sleep Score"]);
		sleepDurationArray.push(Number(page["SleepCalc"]));
	}
	
	dataInterface.renderDataAnalysis(sleepDurationArray, sleepScoreArray);
	```

- **In Bed Time (Total) & Sleep Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const pages = dv.pages('"4500 Data Tracking/Sleep"');
	const pagesArray = pages.array();
	
	let sleepScoreArray = [];
	let sleepDurationArray = [];
	
	for (let page of pagesArray) {
		sleepScoreArray.push(page["Sleep Score"]);
		sleepDurationArray.push(Number(page["BedTimeCalc"]));
	}
	
	dataInterface.renderDataAnalysis(sleepDurationArray, sleepScoreArray);
	```

- **To Sleep Time & Sleep Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const pages = dv.pages('"4500 Data Tracking/Sleep"');
	const pagesArray = pages.array();
	
	let sleepScoreArray = [];
	let sleepDurationArray = [];
	
	for (let page of pagesArray) {
		sleepScoreArray.push(page["Sleep Score"]);
		sleepDurationArray.push(Number(page["ToSleepCalc"]));
	}
	
	dataInterface.renderDataAnalysis(sleepDurationArray, sleepScoreArray);
	```

- **Wake Up Time & Sleep Score**
	```dataviewjs
	const libSRC = app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js";
	delete global.require.cache[global.require.resolve(libSRC)];
	
	const dataviewUtils = require(libSRC);
	
	const dataInterface = new dataviewUtils.DataInterface(app, this.container);
	
	const pages = dv.pages('"4500 Data Tracking/Sleep"');
	const pagesArray = pages.array();
	
	let sleepScoreArray = [];
	let sleepDurationArray = [];
	
	for (let page of pagesArray) {
		sleepScoreArray.push(page["Sleep Score"]);
		sleepDurationArray.push(Number(page["AwakeCalc"]));
	}
	
	dataInterface.renderDataAnalysis(sleepDurationArray, sleepScoreArray);
	```