---
tags:
  - habit
Habit Type:
  - "[[Form New Habit]]"
  - "[[Goal-Based Habit]]"
Values & Goals: 
Cue: 
Craving: 
Response: 
Reward: 
Frequency: 
Time of Day: 
Related Habits:
---
When in doubt, reference [[Options in Metadata]]

# [[<%tp.file.title%>]]

## Prompts & Design
For reference see: [[Guiding Principles]] and [[Value Goals]] as well as [[Alignment Zone#Goal Outcomes]]
### Guidance / Motivation

**Type (goal-based or identity-based):**
Lorem Ipsum

**Values it activates and/or goals it works toward:**
Lorem Ipsum

**Why**
*In detail, why do I want to form or break this habit? What is its purpose? How will this help me?*

Lorem Ipsum
### Cycle
**(Desired) Cue:**
Lorem Ipsum

**(Desired) Craving:**
Lorem Ipsum

**(Desired) Response (this habit -detailed):**
Lorem Ipsum

**(Desired) Reward:**
Lorem Ipsum

### Intention Setting
**Normal:**
*Fill this template in if the habit stands alone*

I will [BEHAVIOUR] at [TIME] in [LOCATION]

**Habit Stacking:**
*Fill this template in if the habit is part of a sequence of habits, as explained in Atomic Habits*

After [CURRENT], I will [NEW] at [TIME] in [LOCATION]

*Note: current = pre-existent and stable habit, new is the habit you want to form*

### V-ABC (if this is a bad habit to break)
*Only fill in this template if the habit is a bad one to break rather than a good one to build up.*
Based off [[Dr. Justin Sung's iCanStudy Course]]

```ad-info
Don’t worry if you can’t immediately think of any of this. It’s meant as a reference to jumpstart the process, otherwise the first step is to simply track using the habit tracker and collect data so that you can detect patterns later on during reflections.
```

- [ ] Take a moment to think about the antecedents of this habit.
	- An antecedent is simply a trigger that causes you to perform this habit.
- [ ] Take a moment to think about possible vulnerability factors for this behavior.
	- What are prerequisite states/moods/feelings, etc. for you to be more susceptible toward this habit?

## Possible Habit Versions
*It is recommended to create around 3 different versions of the habit with 4 difficulties each. Based on a video on habit management referenced in the bibliography.*

### Version 1
*Copy/paste this for the other versions*
- **Show-Up:**
- **Easy:** 
- **Medium:**
- **Hard:**

## Logging
( you only need to create a new log if you have actually shown up today, this is so that the streaks work correctly. )
```meta-bind-button
label: New Habit Log
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: "0000 Meta/Templates/Habits/New Habit Log.md"
    folderPath: "4000 Supplementary Pipelines/Habit Management/Logs"
    fileName: ""
    openNote: true

```

*Note: This db only shows this month's logs.*
```dataview
TABLE WITHOUT ID
file.link AS "Log",
Date AS "Date",
row["Habit Version"] AS "Version",
row["Habit Difficulty"] AS "Difficulty",
row["Points"] AS "Log Points"
FROM "4000 Supplementary Pipelines/Habit Management/Logs"
WHERE row["Related Habit"].file.name = this.file.name
AND row["Date"].month = date(now).month
SORT Date DESC
```

**Habit Data**
```dataviewjs
function isNextDay(previousDate, targetDate) {
  // Ensure we're dealing with Date objects
  previousDate = new Date(previousDate);
  targetDate = new Date(targetDate);

  // 1. Get the next day after the previous date
  const nextDay = new Date(previousDate);
  nextDay.setDate(nextDay.getDate() + 1);

  // 2. Compare the dates (taking timezones into account)
  return nextDay.toISOString().slice(0, 10) === targetDate.toISOString().slice(0, 10);
}

const logs = dv.pages('"4000 Supplementary Pipelines/Habit Management/Logs"').values;

let habitPoints = 0; 
let streakAmount = 0; 
let highestStreak = 0;
let currentStreak = 0;
let lastDate = null; // Initialize to null for easier comparison

for (let log of logs) {
	if (log["Related Habit"].path === dv.current().file.path) {
	    const logDate = new Date(log["Date"]);
	    
		if (!lastDate) {
			// Initial log or first valid date
			streakAmount = 1; 
			currentStreak = 1;
			lastDate = logDate;
		} else if (isNextDay(lastDate, logDate)) {
			currentStreak += 1;
			lastDate = logDate;
		} else {
			highestStreak = Math.max(highestStreak, currentStreak);
		    currentStreak = 1; // Start a new streak
		    streakAmount += 1;
		}
		
		habitPoints += log["Points"];
	}
}

highestStreak = Math.max(highestStreak, currentStreak);

let daysToRecord = highestStreak - currentStreak;

if (daysToRecord < 0) {
	daysToRecord = 0;
}

dv.span(`Habit Points: ${habitPoints}\nNumber of Streaks: ${streakAmount}\n👑Highest Streak: ${highestStreak} Days\nCurrent Streak: ${currentStreak} Days\nDays to Improve Record: ${daysToRecord}`);
```

### Graphs
```tracker
searchType: frontmatter, dvField
searchTarget: Date, Points

xDataset: 0

datasetName: Date, Points
dateFormat: iso-8601

folder: "4000 Supplementary Pipelines/Habit Management/Logs"
fixedScale: 0.8

line:
	title: Log Points over Time
	fillGap: false
	lineColor: yellow, red
	yMin: 0
	yMax: 4

	xAxisLabel: Date

	yAxisLocation: left, left
	yAxisLabel: Log Points
	yAxisUnit: points

	showLegend: true
```
