---
tags:
  - process
cssclasses:
  - md-bigview
Status: 
Goal Outcomes: 
Category: 
Level: 
Easier Harder Summary: 
How it Went Summary: 
Significance:
---
# [[<%tp.file.title%>]]
> [!info]
> After each experiment, redo the evaluation of the process so that it stays up-to-date and accurate.

## Evaluating the Current Level of this Process

1) **How good am I at this right now?**
*This should be general. Example: “Decent” “Bad” etc.*

 2) **How do I know I am this good?**

3) **What condition must be true for my evaluation of my level to be accurate?**
*What would define my evaluation? Example: Bad sleep: For my evaluation to be true, I must be viewing blue light within 20 minutes of going to sleep, etc.*

4) **What is everything I do with regards to this process?**
*Think of this step like an instruction manual for someone else to do exactly what you do - be as specific as possible.*
- 

5) **Is it possible that I am not as good as I think I am?**
*Use the answers to Q2 & Q3 as reference.*

6) **If yes, what do I need to learn more about to be certain of my level?**

## Finding the 1% Improvement
> [!important]
> How can I be 1% better? 
> 
> Any amount of improvement is acceptable, even if it is not technically 1%. 
> Consider improvements relating to:
> - Consistency
> - Speed
> - Being Intentional
> - Reflecting more Regularly or more Critically
> - **Learning more About what you need to do and Experimenting with new Methods**

### Active Marginal Gains Experiments
```dataview
TABLE WITHOUT ID
file.link AS "🧪 Experiment",
spatial-context AS "Spatial Context",
projected-time AS "Projected Time",
energy AS "Energy",
skill AS "Skill",
do-date AS "Do Date",
due-date as "Due Date"
WHERE contains(file.tags, "mg-experiment")
AND contains(processes, link("<%tp.file.title%>"))
AND stage != link("Done") AND stage != link("Not Started")
SORT do-date ASC
```

### Previous Marginal Gains Experiments
```dataview
TABLE WITHOUT ID
file.link AS "🧪 Experiment",
do-date AS "Do Date",
due-date AS "Due Date",
closing-date AS "Closing Date",
how-did-it-go AS "How did it go?",
easier-harder AS "What made it easier or harder?"
WHERE contains(file.tags, "mg-experiment")
AND contains(processes, link("<%tp.file.title%>"))
AND stage = link("Done")
SORT do-date DESC
```