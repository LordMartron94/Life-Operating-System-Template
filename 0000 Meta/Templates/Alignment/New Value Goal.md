---
Status: 
Priority: 
Goal Outcomes: 
tags:
  - Value-Goal
cssclasses:
  - md-bigview
---
# [[<%tp.file.title%>]]
%% Remember, for guidance for the fields, you can check out [[Options in Metadata]] %%

## Why this Value Goal?
%% In this section you fill in why this value goal is important to you. %%

## Related Outcome Goals
```dataview
TABLE WITHOUT ID 
file.link AS "Outcome Goal",
quarter-of-target-completion as "Target Completion Quarter",
projected-timeline-dates as "Projected Timeline Dates",
stage as "Stage",
projects as "Projects",
value-goals AS "Value Goals"
WHERE contains(file.tags, "Outcome-Goal")
AND contains(value-goals, link("<%tp.file.title%>"))
```
```meta-bind-button
label: New 10X Goal Outcome
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Alignment/New 10X Goal Outcome.md
    folderPath: 3000 Core Pipelines/Outcome Goals
    fileName: ""
    openNote: true

```

```meta-bind-button
label: New Smart Goal Outcome
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Alignment/New Smart Goal Outcome.md
    folderPath: 3000 Core Pipelines/Outcome Goals
    fileName: ""
    openNote: true

```
---

## Notes
%% Here you can jot down short notes as they appear with relation to this value goal. %%
- 

## Resources
%% In here you can link to important resources pertaining to this value goal. %%
- 