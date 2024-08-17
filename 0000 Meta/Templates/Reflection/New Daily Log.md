---
tags:
  - daily-reflection
Week: 
Date: 
Schedule: 
Output: 
Issues: 
HRV: 
Respiratory Rate: 
Readiness Score: 
Wrk Start (Hr): 
Wrk Start (Min): 
Activity Score: 
Step Count: 
Effectiveness:
---
# [[<%tp.file.title%>]]
> [!info]
> Feel free to edit this template to what you need for your day. This is just an example that I use.

## 🌅 Morning Startup
- [ ] Take a glass of water
- [ ] Spend a few minutes checking the [[Identity Design]] page.
- [ ] Create the sleep log for the day.
```meta-bind-button
label: New Sleep Log
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/New Sleep Log.md
    folderPath: 4500 Data Tracking/Sleep
    fileName: ""
    openNote: true

```
- [ ] Write the last day's activity score and step count.
```dataview
LIST
WHERE contains(file.tags, "daily-reflection")
AND file.link != link("New Daily Log")
AND date = date(yesterday)
```
- [ ] Get to **work**!

## 🌆 Evening Close-Down
- [ ] Mise-en-place (Clean Room)

**Prioritize Tasks for Next Day**
```ad-info
💡 Criteria for prioritization (for the day):

Try to limit priority tasks to 3.

- Consequence: _How big is the consequence if I do not do the task?_
    - Low, Medium, High, Risk.
    - Can I accept the consequence?
- Leverage: _Does this put me in a better position in the short-term or long-term?_
    - If I do this now, does it save me (a lot of) time in the future?
    - Reference the objectives for the week (and potentially the month, but not up.)

_Source:_ _( [https://www.youtube.com/watch?v=HOWb_3bOgTE&](https://www.youtube.com/watch?v=HOWb_3bOgTE&) )_
```

- **Objectives**
	 ![[Schwerpunkt#OBJECTIVES]]
- **View Tasks**
	```dataview
	TABLE WITHOUT ID
	stage AS "Stage",
	file.link AS "Action Item",
	row["10k Priority"] AS "10K Priority",
	daily-type AS "Daily Type",
	do-date AS "Do Date",
	due-date AS "Due Date",
	projects AS "Projects"
	WHERE contains(file.tags, "action")
	AND file.link != link("Taxonomy") AND file.link != link("New Action Item")
	AND (
		stage = link("Next-Up") 
		OR stage = link("Not Started")
		OR stage = link("In Progress")
	)
	AND (
		do-date = ""
		OR do-date <= date(tomorrow)
	)
	SORT stage DESC, daily-type ASC
	```

*Note: to plan the task: open up the action item and fill in the do-date, then change the stage from next-up to Not Started and assign a daily type.*

- [ ] Open up the [[Focus Zone]] and time-block the tasks for the next day. 
	- [ ] Do this also in Google Calendar (and reference it) because GCal houses the 10K category blocks.
- [ ] If I didn’t complete tasks or followed the time schedule, write down in issues why this is the case.
- [ ] Fill in the System Usage Log
```meta-bind-button
label: New System Usage Log
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Meta/System Usage Log Template.md
    folderPath: 4500 Data Tracking/System Usage
    fileName: ""
    openNote: true

```
- [ ] Shut down computer (sleep mode)
