---
cssclasses:
  - md-bigview
tags:
  - dashboard
---

# [[All Processes Overview]]

```dataview
TABLE WITHOUT ID
status AS "Status",
file.link AS "Process",
goal-outcomes AS "Goal Outcome(s)",
category AS "Category",
level AS "Level"
WHERE contains(file.tags, "process")
AND file.link != link("Taxonomy") AND file.link != link("New Process")
SORT significance ASC
```
