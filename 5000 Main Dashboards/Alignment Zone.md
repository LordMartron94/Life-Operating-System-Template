---
tags:
  - dashboard
cssclasses:
  - dashboard
  - md-bigview
---
# [[Alignment Zone]]

## 🧠 INSIGHT & IDENTITY
- Guiding Principles - 🧭 Compass
	 ![[Guiding Principles#Guiding Principles]]

## 🏛️ Structure

### Goal Pipelines
```ad-info
💡 It’s useful to determine the _amount_ of active goal outcomes based on **time availability**. While going to school, I recommend to have:
- One goal where you must spend a LOT of time on — preferably based on the Schwerpunkt
- One goal to spend a moderate amount of time on
- One goal to spend a minimal amount of time on

Ideally these goals are determined based on **impact**—**signifance**—towards the totality of your life.
```

#### Value Goals
```dataview
TABLE WITHOUT ID
status AS "Status",
file.link AS "Value Goal",
priority AS "Priority",
goal-outcomes AS "Outcome Goals"

FROM -"0000 Meta/Examples"
WHERE contains(file.tags, "Value-Goal")
AND file.link != link("New Value Goal") AND file.link != link("Taxonomy")
AND status != link("Complete")
SORT status ASC, priority ASC
```

#### Goal Outcomes
##### All
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Goal Outcome",
priority AS "Priority",
input-time-required AS "Input Time Required",
why-this-goal AS "Why this goal?",
term AS "Term",
projected-timeline-dates AS "Projected Timeline Dates",
row["Value Goals"] AS "Value Goals"

FROM -"0000 Meta/Examples"
WHERE contains(file.tags, "Outcome-Goal")
AND file.link != link("New 10X Goal Outcome") AND file.link != link("Taxonomy") AND file.link != link("New Smart Goal Outcome")
SORT stage DESC, priority ASC, end-date ASC
```
##### Focus
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Goal Outcome",
priority AS "Priority",
input-time-required AS "Input Time Required",
why-this-goal AS "Why this goal?",
term AS "Term",
projected-timeline-dates AS "Projected Timeline Dates",
row["Value Goals"] AS "Value Goals"

FROM -"0000 Meta/Examples"
WHERE contains(file.tags, "Outcome-Goal")
AND file.link != link("New 10X Goal Outcome") AND file.link != link("Taxonomy") AND file.link != link("New Smart Goal Outcome")
AND (stage = link("In Progress") OR stage = link("Ongoing"))
SORT stage DESC, end-date ASC, priority ASC
```

### Execution Pipelines

#### Projects
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Project",
projected-timeline-dates AS "Projected Timeline Dates",
next-review AS "Next Review Data",
closing-date AS "Closing Date",
row["Outcome Goals"] AS "Outcome Goals"
WHERE contains(file.tags, "project")
AND file.link != link("New Project") AND file.link != link("Taxonomy")
SORT stage DESC, end-date ASC
```

#### Actions (inbox)
```dataview
TABLE WITHOUT ID
stage AS "Stage",
file.link AS "Action Item",
row["10k Priority"] AS "10k Priority",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy Required",
skill AS "Skill",
row["DO Date"] AS "DO Date",
row["Due Date"] AS "Due Date"
WHERE contains(file.tags, "action")
AND file.link != link("New Action Item") AND file.link != link("Taxonomy")
AND stage = link("Triage")
```
