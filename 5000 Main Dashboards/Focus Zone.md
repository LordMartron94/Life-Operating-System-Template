---
tags:
  - dashboard
cssclasses:
  - md-bigview
  - dashboard
---
# [[Focus Zone]]
*Note: there is no way to make this button open the note in a new tab...*
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

Important Objectives this week: 
	![[Schwerpunkt#WEEK]]
Important Objectives this month:
	![[Schwerpunkt#MONTH]]

To see more about important objectives in the current periods (week - ten year), see: [[Schwerpunkt]]

## 🗓️ TODAY
### ☀️ Daily Tracking
```meta-bind-button
label: New Daily Log
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Reflection/New Daily Log.md
    folderPath: 4000 Supplementary Pipelines/Reflection/Daily
    fileName: ""
    openNote: true

```
```dataview
LIST
WHERE contains(file.tags, "daily-reflection")
AND file.link != link("Taxonomy") AND file.link != link("New Daily Log")
AND date = date(today)
```

### Active Actions
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
row["10k Priority"] AS "10k Priority",
daily-type AS "Daily Type",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy Required",
do-date AS "DO Date",
due-date AS "Due Date"
WHERE contains(file.tags, "action")
AND file.link != link("New Action Item") AND file.link != link("Taxonomy")
AND stage != link("Triage")
AND stage != link("Next-Up")
AND stage != link("Done")
AND date(do-date).day <= date(today).day
SORT stage DESC, daily-type ASC, spatial-context ASC, energy DESC, projected-time DESC
```

### Completed Actions
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
row["10k Priority"] AS "10k Priority",
daily-type AS "Daily Type",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy Required",
do-date AS "DO Date",
due-date AS "Due Date"
WHERE contains(file.tags, "action")
AND file.link != link("New Action Item")
AND stage = link("Done")
AND closing-date = date(today)
```

### To be Reviewed Marginal Gains
```dataview
LIST
WHERE contains(tags, "mg-experiment")
AND closing-date <= date(today)
AND stage = link("To be Reviewed")
```

## 🔮 PROSPECTION

### Next-Up Actions
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy Required",
skill AS "Skill",
aligned-with-weekly-priorities AS "Aligned With Weekly Priorities",
projects AS "Projects"
WHERE contains(file.tags, "action")
AND file.link != link("New Action Item")
AND stage = link("Next-Up")
```

### Actions This Week

#### Tomorrow
```dataview
TABLE WITHOUT ID
file.link AS "Action Item",
spatial-context AS "Context"
WHERE contains(tags, "action")
AND file.link != link("New Action Item")
AND do-date.day = date(tomorrow).day
```
#### Next 7 Days
```dataview
TABLE WITHOUT ID
file.link AS "Action Item",
spatial-context AS "Context"
WHERE contains(tags, "action")
AND file.link != link("New Action Item")
AND do-date > date(tomorrow) AND do-date < (date(today) + dur("7 days"))
```


### DUE Soon Actions
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
due-date AS "Due Date",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy Required",
skill AS "Skill",
projects AS "Projects"
WHERE contains(file.tags, "action")
AND file.link != link("New Action Item")
AND stage = link("Next-Up") OR stage = link("Not Started")
WHERE date(due-date).day <= (date(today) + dur("14 days")).day
AND due-date
SORT due-date ASC
```


## 📆 CALENDAR
*In the future I will add the possibility for recurrence into the calendar as this is my preferred way of scheduling. [[Ideal Scheduling Method]]*

Note: sometimes, the calendar event pop up does not work because it does not create the DO Date end property correctly. I have no idea why this is yet, you have to manually fix this either in the event note itself or by `right click -> edit event -> correct do date end -> save`. I will try to fix this in the future.
```dataviewjs 
delete global.require.cache[global.require.resolve(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js")];

const dataviewLib = require(app.vault.adapter.basePath + "/0000 Meta/JavaScript/dataviewLib.js");

const { renderCalendar } = app.plugins.plugins["obsidian-full-calendar"]; 

const calendarLib = new dataviewLib.CalendarLib(dv, "/0000 Meta/JavaScript");

const eventsArray = await calendarLib.getEvents("3000 Core Pipelines/Action Items", "rgb(117, 117, 117)", false, "DO Date");

this.container.style.minHeight = "500px"; 

const calendar = renderCalendar(this.container, [eventsArray]);

calendar.setOption('eventChange', await calendarLib.eventChange);
calendar.setOption('eventClick', await calendarLib.eventClick);
calendar.setOption('eventMouseEnter', await calendarLib.eventMouseEnter);

calendar.render();
```