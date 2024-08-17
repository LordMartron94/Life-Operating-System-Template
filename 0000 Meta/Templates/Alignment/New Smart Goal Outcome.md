---
tags:
  - Outcome-Goal
cssclasses:
  - md-bigview
Type: "[[Conventional SMART Goal]]"
Quarter of (Target) Completion: 
Why This Goal: 
Stage: 
Input Time Required: 
Priority: 
Term: 
Projected Timeline Dates: 
End Date: 
Value Goals: 
10X Goals:
---
# [[<%tp.file.title%>]]
%% Remember, for guidance for the fields, you can check out [[Options in Metadata]] %%

## Goal Anchoring
The first step in the creation of an outcome goal is to anchor it, to define it adequately.
The goal should be SMART.
```ad-info
title: SMART
collapse: closed
**S**pecific
**M**easurable
**A**chievable
**R**ealistic
**T**imebound
```

Lorem ipsum (write here).

### Why this Goal?
%% Paste this into the `why this goal` field in the metadata. %%
*In this section you shall answer why you have this goal outcome... Why is it important to you? Why is it relevant? How does this help you become who you want to become? What values of yours does it serve? How significant is the goal? Is it important at all?*

Lorem ipsum (write here).

#### References (Inspirations)

##### Value Goals
```dataview
TABLE WITHOUT ID 
status AS "Status",
file.link AS "Value Goal",
priority AS "Priority",
goal-outcomes AS "Goal Outcomes"
WHERE contains(file.tags, "Value-Goal")
AND file.link != link("New Value Goal") AND file.link != link("Taxonomy")
SORT priority ASC
```

##### Guiding Principles
![[Guiding Principles]]



## Goal Determination
*How much input-time will it likely require to accomplish this goal? Something can take many months, but only a minimal amount of time to invest on a day-to-day, week-to-week, basis—this is what I am talking about here.*

Lorem ipsum (write here).


## Action Implementation

### Projects
```dataview
TABLE WITHOUT ID 
stage AS "Stage",
file.link AS "Project",
projected-timeline-dates AS "Projected Timeline Dates",
next-review-date AS "Next Review Date",
closing-date AS "Closing Date",
progress AS "Progress",
completed AS "Completed",
goal AS "Goal"
WHERE contains(file.tags, "Project")
AND contains(outcome-goals, link("<%tp.file.title%>"))
```

```meta-bind-button
label: New Project
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Focus/New Project.md
    folderPath: 3000 Core Pipelines/Projects
    fileName: ""
    openNote: true

```

### Notes:
%% Here you can jot down short notes as they appear with relation to this goal outcome. %%
- 
### Resources:
%% In here you can link to important resources pertaining to this goal outcome. %%
- 