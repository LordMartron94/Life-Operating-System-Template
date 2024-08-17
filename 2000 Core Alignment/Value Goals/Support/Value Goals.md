---
cssclasses:
  - md-bigview
tags:
  - dashboard
---

# [[Value Goals]]
These are broad, vague, unachievable goals, with horizons/posts that keep expanding. Their focus is to **motivate**. They are related to your principles as defined in the [[Guiding Principles]].
An example could be: *"I want to be the best learner I can possibly be,"* or *"I want to teach as many people as I can in my discipline."*

**You keep working on them as long as they matter to you.**

---

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