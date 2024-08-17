---
cssclasses:
  - md-bigview
tags:
  - monthly-reflection
Start Date: 
End Date: 
Theme: 
To Make Awesome: 
Gratitude: 
Learned This Month: 
This Year: 
Next Year:
---
# [[<%tp.file.title%>]]

## Weekly Overview
```dataview
TABLE WITHOUT ID
file.link AS "Week",
row["Focus and Objectives"] AS "Focus and Objectives",
row["Effectiveness"] AS "Effectiveness",
row["Gratitude"] AS "Gratitude",
row["Improvement Summary"] AS "Improvement Summary"

WHERE contains(file.tags, "weekly-reflection")
AND file.link != link("Taxonomy") AND file.link != link("New Weekly Review")
AND contains(file.outlinks, link("<%tp.file.title%>"))
SORT end-date ASC
```
```dataviewjs
delete global.require.cache[global.require.resolve(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js")];

const dataviewLib = require(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js");

const weeklyNotesReportLib = new dataviewLib.WeeklyNotesReport(app);

let pages = dv.pages('"4000 Supplementary Pipelines/Reflection/Weekly"');

const filteredPages = [];

for (let page of pages) {
	const currentPage = dv.current();

	for (let link of page.file.outlinks.values) {
		if (link.path === currentPage.file.link.path) {
			filteredPages.push(page);
		}
	}
}

const el = weeklyNotesReportLib.buildRenderElement(filteredPages);

this.container.appendChild(el);
```
## Action Items Completed This Month
- [ ] Skim Action Items for this Month
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

## Monthly Reflection
- [ ] Enter Gratitude(s) for the past Month. Study your weekly listed "Improvements" then enter what you learned from them in properties above.
- [ ] Check out the objectives for last month. Were we on track? If not, what can we do to change it the coming month? What did we learn? Write this in the properties above.
Objectives: [[Schwerpunkt#MONTH]]

---
## I. Identity & Structure
### Review & Update
- [ ] Review performance in the daily tracking DB as well as the Sleep Logs.
- [ ] Review & Refine [[Identity Design]] page as needed.

#### Daily Overview
```dataview
TABLE WITHOUT ID
file.link AS "Day",
schedule AS "Schedule", 
output AS "Output",
issues AS "Issues",
row["Wrk Start (Hr)"] AS "Work Start (Hour)",
row["Wrk Start (Min)"] AS "Work Start (Minute)",
row["HRV"] AS "HRV",
row["Respiratory Rate"] AS "Respiratory Rate"

WHERE contains(file.tags, "daily-reflection")
AND file.link != link("Taxonomy") AND file.link != link("New Daily Log")
AND date >= this.start-date AND date <= this.end-date
SORT date DESC
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

const el = dailyNotesReportLib.buildRenderElement(filteredPages, "Monthly");

this.container.appendChild(el);
```
#### Sleep Overview
```dataview
TABLE WITHOUT ID
file.link AS "Sleep Log",
date AS "Date",
sound AS "Sound",
caffeine AS "Caffeine",
routine AS "Routine",
incentive AS "Incentive",
bed-space AS "Bed Space",
light AS "Light",
exercise AS "Exercise",
devices AS "Devices",
napping AS "Napping",
consistency AS "Consistency",
row["To Sleep (Hr)"] AS "To Sleep Hour",
row["To Sleep (Min)"] AS "To Sleep Min",
row["Awake (Hr)"] AS "Awake Hr",
row["Awake (Min)"] AS "Awake Min",
sleep-score AS "Sleep Score",
row["Total Sleep (Hr)"] AS "Total Sleep Hr",
row["Total Sleep (Min)"] AS "Total Sleep Min",
row["REM Sleep (Hr)"] AS "REM Hr",
row["REM Sleep (Min)"] AS "REM Min",
row["Light Sleep (Hr)"] AS "Light Sleep Hr",
row["Light Sleep (Min)"] AS "Light Sleep Min",
row["Deep Sleep (Hr)"] AS "Deep Sleep Hr",
row["Deep Sleep (Min)"] AS "Deep Sleep Min",
row["Avg. Blood Oxygen"] AS "Average Blood Oxygen",
row["Resting HR"] AS "Lowest Resting Heart Rate",
row["Sleep Efficiency"] AS "Sleep Efficiency"

WHERE contains(file.tags, "sleep-log")
AND file.link != link("Taxonomy") AND file.link != link("New Sleep Log")
AND date >= this.start-date AND date <= this.end-date
SORT date DESC
```
```dataviewjs
delete global.require.cache[global.require.resolve(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js")];

const dataviewLib = require(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js");

const sleepNotesReportLib = new dataviewLib.SleepNotesReport(app);

let pages = dv.pages('"4500 Data Tracking/Sleep"');

const filteredPages = [];

for (let page of pages) {
	const currentPage = dv.current();

	if (new Date(page.date) >= new Date(currentPage["Start Date"]) && new Date(page.date) <= new Date(currentPage["End Date"])) {
		filteredPages.push(page);
	}
}

const el = sleepNotesReportLib.buildRenderElement(filteredPages);

this.container.appendChild(el);
```

## II. Pipelines
### GOALS: Review & Update
- [ ] Any new goals? [[Alignment Zone#Goal Outcomes]]
	- [ ] Look at the weekly reflections, and maybe journal(s), determine what is the most *pressing* problem in your life right now. This should be at least one goal (or *purpose*) to solve right now.
	- [ ] Reprioritize goals based on what is most *pressing*, and has the most *leverage*.
	- [ ] Check out the goals for this quarter, see if we are still on track. 
		- [ ] If not, what have we learned? What must we change?
- [ ] Mark any "Completed" Goals
- [ ] Update Outcome Goal Timelines (Dates & Quarters)

### PROJECTS: Review & Update [[Alignment Zone#Projects]]
- [ ] Review/Update "Status" setting
- [ ] Update Project Timelines (Dates & Quarters)
- [ ] Prioritize Projects <span style="color:rgb(148, 148, 148)">- determine "Active" Projects for the upcoming month</span> 

### OBJECTIVES: Update
- [ ] Determine the objectives to reach for this month. Keep at a minimum (1-3) and maximum of 5.
[[Schwerpunkt#MONTH]]

---
- [ ] Add a new month for the next month.
```meta-bind-button
label: New Month
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Reflection/New Monthly Review.md
    folderPath: 4000 Supplementary Pipelines/Reflection/Monthly
    fileName: ""
    openNote: true

```