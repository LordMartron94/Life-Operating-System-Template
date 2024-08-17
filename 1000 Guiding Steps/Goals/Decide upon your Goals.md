---
cssclasses:
  - md-bigview
---
# [[Decide upon your Goals]]
< Previous Step: [[Formulate your 100X Vision|Vision & Anti-Vision]] | Next Step: [[Determine the most important Areas of your Life|Areas]] >

( Note: if for whatever reason you need more explanation for concepts discussed, check out [[Index of Background Concepts]] )
*Not sure what you need to fill in for certain metadata fields? See [[Options in Metadata]] and [[Taxonomy]]*

---

Now that you have determined your 100X vision and your anti-vision, it is time to decide upon some (10X) goals.

The first step is to come up with your *value goals*, these are broad, vague, unachievable goals, with horizons/posts that keep expanding. Their objective is to **motivate**. They are related to your principles as defined in the [[Guiding Principles]].
An example could be: *"I want to be the best learner I can possibly be,"* or *"I want to teach as many people as I can in my discipline."*

You keep working on them as long as they matter to you.

**Value Goals:**
*Do not yet worry about going down the pipeline and creating goal outcomes for these value goals. We will guide you through it.*
```dataview
TABLE WITHOUT ID
status AS "Status",
file.link AS "Value Goal",
priority AS "Priority",
goal-outcomes AS "Outcome Goals"
WHERE contains(file.tags, "Value-Goal")
AND file.link != link("New Value Goal") AND file.link != link("Taxonomy")
AND status != link("Complete")
SORT status ASC, priority ASC
```
```meta-bind-button
label: New Value Goal
icon: ""
hidden: false
class: ""
tooltip: ""
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 0000 Meta/Templates/Alignment/New Value Goal.md
    folderPath: 2000 Core Alignment/Value Goals
    fileName: ""
    openNote: true

```

---
**Goal Outcomes:**
Now that the value goals have been determined, think of some goals you want to achieve in the future. Ideally, you want to have one *10X Goal Outcome* you work on at all time; this should be related to your [[Unique Ability]]. A 10X goal should have at least one SMART goal set up to aid in progression toward that. 
Other than a 10X goal, you can have multiple other SMART goals active which work toward ambitions in other areas of your life.

```ad-note
title: Info
collapse: open
Every goal, whether SMART or 10X, must be related to at least one value goal... If this is not the case, you should seriously consider dropping the goal, or at least reflecting on whether it is time pursuing as it's not related to what you truly value in life (or perhaps you simply miss a value goal),

```

*Now go and create your goal outcomes. Really take the time to fill everything in the template out; this has massive returns on the effort spent into it.*

**Skip on the projects... We will guide you through that later. Processes can be filled in, however.**

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
WHERE contains(file.tags, "Outcome-Goal")
AND file.link != link("New 10X Goal Outcome") AND file.link != link("Taxonomy") AND file.link != link("New Smart Goal Outcome")
SORT stage DESC, priority ASC, end-date ASC
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

< Previous Step: [[Formulate your 100X Vision|Vision & Anti-Vision]] | Next Step: [[Create a few starting Projects||Project Creation]] >