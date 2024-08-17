const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/Calendar')];

const {Calendar} = require("./Calendar");
const {readFromJson} = require("../utils");

class CalendarLib {
    constructor(dv, jsPath) {
        this.calendar = new Calendar(dv, jsPath);
        this.jsPath = jsPath;
    }

    async addNewEventsIfNotExists(directory, color, eventsArray, bypassFilters = false, datePropName = "Date") {
        // console.log(`Calendar (add Events): ${this.calendar}`);
        return await this.calendar.addNewEventsIfNotExists(directory, color, eventsArray, bypassFilters, datePropName);
    }

    async getEvents(directory, color, bypassFilters = false, datePropName = "Date") {
        // console.log(`Calendar (get Events): ${this.calendar}`);
        return await this.calendar.getEvents(directory, color, bypassFilters, datePropName);
    }

    openContextMenuForEvent = async (event, mouseEvent) => {
        console.log(`Calendar (open Context): ${this.calendar}`);

        await this.calendar.openContextMenuForEvent(event, mouseEvent, this.jsPath);
    }

    eventChange = async (changeInfo) => {
        await this.calendar.eventChange(changeInfo);
    }

    eventClick = (eventClickInfo) =>
    {
        console.log("CLICK!");

        this.calendar.eventClick(eventClickInfo);
    }

    eventMouseEnter = async (eventInfo) => {
        // console.log(`Calendar (event Mouse Enter): ${this.calendar}`); -- Correct

        const el = eventInfo.el; // Store reference to the event element

        const contextMenuListener = async (event) => {
            event.preventDefault();
            const eventData = eventInfo.event;
            await this.openContextMenuForEvent(eventData, event);
        };

        el.addEventListener('contextmenu', contextMenuListener);

        // Detach listener on mouseleave
        el.addEventListener('mouseleave', () => {
            el.removeEventListener('contextmenu', contextMenuListener);
        });

        await this.calendar.eventMouseEnter(eventInfo);
    }
}

module.exports = {
    CalendarLib
};