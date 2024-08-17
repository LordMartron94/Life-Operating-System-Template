---
tags:
  - project
cssclasses:
  - md-bigview
Stage: 
Projected Timeline Dates: 
Next Review Date: 
Closing Date: 
Skill: 
Outcome Goals: 
Quarter of (Target) Completion:
---
# [[<%tp.file.title%>]]

## Why do I have this Project?

## Thoughts & Reminders
*Write down any problems we encounter as well here.*
- 

---

## Task Inbox
```dataview
TABLE WITHOUT ID
stage as "Stage",
file.link as "Action Item",
spatial-context as "Spatial Context",
projected-time as "Projected Time",
energy as "Energy",
due-date as "Due Date"
WHERE contains(file.tags, "action")
AND contains(projects, "<%tp.file.title%>")
AND stage = link("Triage")
```
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
## Task Overview
```dataview
LIST
WHERE contains(file.tags, "action")
AND contains(projects, "<%tp.file.title%>")
AND stage = link("Triage")
SORT closing-date DESC, do-date ASC
GROUP BY stage
```
