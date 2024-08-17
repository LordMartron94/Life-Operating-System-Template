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
```
