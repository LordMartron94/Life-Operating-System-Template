---
tags:
  - weekly-reflection
cssclasses:
  - md-bigview
Start Date: ""
End Date: ""
Month: 
Focus and Objectives: 
Effectiveness: 
Gratitude: 
Improvement Summary:
---
# [[<%tp.file.title%>]]

## Daily Overview
```dataview
TABLE WITHOUT ID
file.link AS "Day",
schedule AS "Schedule", 
output AS "Output",
issues AS "Issues",
row["Wrk Start (Hr)"] AS "Work Start (Hour)",
row["Wrk Start (Min)"] AS "Work Start (Minute)",
effectiveness AS "Effectiveness"

WHERE contains(file.tags, "daily-reflection")
AND file.link != link("Taxonomy") AND file.link != link("New Daily Log")
AND date >= this.start-date AND date <= this.end-date
SORT date ASC
```
```dataviewjs
delete global.require.cache[global.require.resolve(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js")];

const dataviewLib = require(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js");

const dailyNotesReportLib = new dataviewLib.DailyNotesReport(app);

let pages = dv.pages('"4000 Supplementary Pipelines/Reflection/Daily"');

const filteredPages = [];

for (let page of pages) {
	const currentPage = dv.current();

	if (new Date(page.date) >= new Date(currentPage["Start Date"]) && new Date(page.date) <= new Date(currentPage["End Date"])) {
		filteredPages.push(page);
	}
}

const el = dailyNotesReportLib.buildRenderElement(filteredPages);

this.container.appendChild(el);
```

## Sleep Overview
*Note: you need to change the min and end date in the trackers manually*

- **To Sleep & Awake Times -- This Week**
```tracker
searchType: frontmatter, dvField, dvField
searchTarget: Date, ToSleepCalc, AwakeCalc

xDataset: 0

datasetName: Date, ToSleep, Awake
dateFormat: iso-8601
startDate: 2024-07-14
endDate: 2024-07-20

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
- **Sleep Time -- This Week**
```tracker
searchType: frontmatter, dvField
searchTarget: Date, SleepCalc

xDataset: 0

datasetName: Date, Sleep Time
dateFormat: iso-8601
startDate: 2024-07-14
endDate: 2024-07-20

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
-  **Sleep Score -- This Week**
```tracker
searchType: frontmatter
searchTarget: Date, Sleep Score

xDataset: 0

datasetName: Date, Sleep Score
dateFormat: iso-8601
startDate: 2024-07-14
endDate: 2024-07-20

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
- **Sleep Efficiency -- This Week**
```tracker
searchType: frontmatter
searchTarget: Date, Sleep Efficiency

xDataset: 0

datasetName: Date, Sleep Efficiency
dateFormat: iso-8601
startDate: 2024-07-14
endDate: 2024-07-20

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
## Action Items Completed This Week
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
daily-type AS "Daily Type",
row["10k Priority"] AS "10k Priority",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy",
do-date AS "DO Date",
due-date AS "Due Date",
closing-date AS "Closing Date",
projects AS "Projects",
row["Aligned With Weekly Priorities"] AS "Aligned With Weekly Priorities"

WHERE contains(file.tags, "action")
AND file.link != link("Taxonomy") AND file.link != link("New Action Item")
AND closing-date >= this.start-date AND closing-date <= this.end-date

SORT daily-type ASC, closing-date DESC
```

---

## I. Identity
- [ ] Review Guiding Principles (quick skim the bullet points)
	 [[Guiding Principles]]

### Weekly Reflection
- [ ] Review performance stats above (the daily overview). **Where do I need to improve this coming week?**
- Prompts
	- Where did I go wrong with prioritization (leverage)?
	- Procrastination?
	- General inefficient time usages? *Why was it there? How can this be avoided?*

- [ ] Effectiveness / Gratitude / Improvement Summary (write those in the fields above with guidance of the prompts below)
	- *If nothing changes right now, then **who am I becoming**? And does this lead me toward my **vision**, or toward my **anti-vision**?*
		- Thus, what do I have to change?
	- In the improvements, also include what the most ***pressing*** problems in your life are right now.
- [ ] Check out the Marginal Gains for this week, and analyze what worked and didn’t work as well as how it went. See what can be learned from this for future experiments.
	- It is important that this is reflected in the summary for this week’s learned lessons and improvements.
- [ ] Check out the objectives for last week & see if we got to them or not, if so, why.

**Experiments:**
```dataview
TABLE WITHOUT ID
file.link AS "Experiment",
do-date AS "DO Date",
due-date AS "Due Date",
closing-date AS "Closing Date",
processes AS "Processes",
row["Easier Hard"] AS "What made it easier or harder?",
row["How Did it Go"] AS "How did it go?"

WHERE contains(tags, "mg-experiment")
AND closing-date >= this.start-date AND closing-date <= this.end-date
SORT closing-date DESC
```

## II. Pipelines
- [ ] Task Inbox to zero - plan everything in (triage to next-up): [[Alignment Zone#Execution Pipelines]]
- [ ] Determine the next week's objectives
	- Use as a guide the analysis in the upper section (marginal gains, improvements, etc.)
	- Use the [[Goal Proactivity Tool]] for help.
	- Objectives: [[Schwerpunkt#OBJECTIVES]]
- [ ] Projects review... Evaluate where projects stand... **have at least one next "active action" for each**
	- [ ] Also take a look at each project’s current problems and inefficiencies. See if any solutions pop to mind. If so, add it to the tasks.
	- View Projects
		```dataview
		 TABLE WITHOUT ID
		 stage AS "Stage",
		 file.link AS "Project",
		 projected-timeline-dates AS "Projected Timeline Dates"
		 
		 WHERE contains(file.tags, "project")
		 AND file.link != link("Taxonomy") AND file.link != link("New Project")
		 AND (
			 stage = link("Ongoing")
			 OR stage = link("In Progress")
		)
		```
- [ ] Sync bank account with [[Finance Dashboard]]
- [ ] Add new week for next week.
```meta-bind-button
label: New Week
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Reflection/New Weekly Review.md
    folderPath: 4000 Supplementary Pipelines/Reflection/Weekly
    fileName: ""
    openNote: true

```

## III. Vaults
- [ ] Desktop & Download Folders (Re-Locate items or Delete) (Triage)