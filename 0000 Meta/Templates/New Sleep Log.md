---
tags:
  - sleep-log
Date: 
Sound: 
Caffeine: 
Routine: 
Incentive: 
Bed Space: 
Light: 
Exercise: 
Devices: 
Napping: 
Consistency: 
Total Sleep (Hr): 
Total Sleep (Min): 
Sleep Efficiency: 
Resting HR: 
Sleep Score: 
REM Sleep (Hr): 
REM Sleep (Min): 
Light Sleep (Hr): 
Light Sleep (Min): 
Deep Sleep (Hr): 
Deep Sleep (Min): 
To Sleep (Hr): 
To Sleep (Min): 
Awake (Hr): 
Awake (Min): 
Avg. Blood Oxygen:
---
*Note for the tracking to work, as a temporary workaround, you need to manually type these values (replace the calculation with the output value)*

SleepCalc:: `$= Math.round((((this.current()["Total Sleep (Hr)"] * 60) + (this.current()["Total Sleep (Min)"])) / 60) * (10 ** 2)) / (10 ** 2)`
ToSleepCalc:: `$= Math.round((((this.current()["To Sleep (Hr)"] * 60) + (this.current()["To Sleep (Min)"])) / 60) * (10 ** 2)) / (10 ** 2)`
AwakeCalc:: `$= Math.round((((this.current()["Awake (Hr)"] * 60) + (this.current()["Awake (Min)"])) / 60) * (10 ** 2)) / (10 ** 2)`
BedTimeCalc:: `$=Math.round(((12 - this.current()["ToSleepCalc"]) + this.current()["AwakeCalc"]) * (10 ** 2)) / (10 ** 2)`

# [[<%tp.file.title%>]]

## Meaning of the Several Checkboxes
This is Dr. Sung's SCRIBLED N Co for good sleep. 

*To be fair: I need to edit this template in the future to fit my own routines, but for now it's fine.*
```ad-info
- **Sound**: Remove disruptive sounds, wear earplugs and/or play white noise. 
- **Caffeine**: Avoid caffeine (including caffeine in foods or tea) within 6 hours of sleep. 
- **Routine**: Do a wind-down routine 30 minutes before sleeping. Recommended to do meditation or focus training as instructed. 
- **Incentive**: Schedule events or activities with an accountability buddy the next morning to incentivise you to wake up early. 
- **Bed Space**: Only sleep or light bed-time reading on or near your bed*. 
- **Light**: Use black-out curtains or remove any light sources as much as possible. 
- **Exercise**: Engage in aerobic exercise during the day, preferably in the morning. 
- **Devices**: Turn off devices 30 minutes before sleep. Lead into your routine. 
- **Napping**: Avoid day-time napping if possible. 
- **Consistency**: Minimise social jet lag and sleep at similar hours on all days.
```



