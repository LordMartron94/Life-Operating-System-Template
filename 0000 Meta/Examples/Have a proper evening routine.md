---
tags:
  - process
cssclasses:
  - md-bigview
Status:
  - "[[Ongoing]]"
Goal Outcomes:
  - "[[Have finished the iCS course]]"
  - "[[Have created a learning system based on a couple hundred sources by July 2030]]"
Category: "[[Sleep]]"
Level: "[[⭐⭐⭐]]"
Easier Harder Summary: 
How it Went Summary: 
Significance: For having finished the iCS course, having a good evening routine is ESSENTIAL because it allows me to be more energetic and engage in deeper thought processing. The same goes for the creation of a learning system based on a couple hundred sources.
---
# [[Have a proper evening routine]]

## Evaluating the Current Level of this Process

1) **How good am I at this right now?**
*This should be general. Example: “Decent” “Bad” etc.*
Average

 2) **How do I know I am this good?**
Because my Ôura ring tells me I am somewhat consistent at going to bed on time.

3) **What condition must be true for my evaluation of my level to be accurate?**
*What would define my evaluation? Example: Bad sleep: For my evaluation to be true, I must be viewing blue light within 20 minutes of going to sleep, etc.*
I must go to bed at the same time (within 30 minutes margin) at least 3/7 days of the week.

4) **What is everything I do with regards to this process?**
*Think of this step like an instruction manual for someone else to do exactly what you do - be as specific as possible.*
- At the moment I do not do anything specific (if I had an evening routine I'd write it down here)

5) **Is it possible that I am not as good as I think I am?**
*Use the answers to Q2 & Q3 as reference.*
No because I compare it to my actual Ôura Ring data.

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
AND contains(processes, link("Have a proper evening routine"))
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
AND contains(processes, link("Have a proper evening routine"))
AND stage = link("Done")
SORT do-date DESC
```