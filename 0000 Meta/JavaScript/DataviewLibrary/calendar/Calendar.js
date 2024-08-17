const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/contextMenuLib')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/EventNote')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/ColorModal')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/HoverLib')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/EditEvent')];

const { getNotes } = require('../utils');
const { ContextMenu } = require('../contextMenuLib');
const { EventNote } = require('./EventNote');
const { ColorModal } = require('./ColorModal');
const { HoverPopup } = require('./HoverLib');
const { EditEvent } = require('./EditEvent');

class Calendar {
    constructor(dv, jsPath) {
        this.dataView = dv;
        this.jsPath = jsPath;
    }

    async addNewEventsIfNotExists(directory, color, eventsArray, bypassFilters = false, datePropName = "Date") {
        const newArray = [...eventsArray]; // Create a copy of eventsArray

        const eventsFromDirectory = await this.getEvents(directory, color, bypassFilters, datePropName);

        for (const eventFromDir of eventsFromDirectory) {
            const matchingEvent = newArray.find(existingEvent => existingEvent.id === eventFromDir.id);

            if (!matchingEvent) {
                // console.log("No match: " + eventFromDir.title);
                newArray.push(eventFromDir);
            }
        }

        return newArray;
    }

    async getEvents(directory, color, bypassFilters = false, datePropName = "Date", descriptionPropName = "Description") {
        const eventsArray = [];
        const notes = await getNotes(directory, this.dataView);

        console.info("Getting events!");

        for (const note of notes) {
            let event = new EventNote(note, datePropName, undefined, descriptionPropName);

            if (bypassFilters || await event.isNoteValid()) {
                const id = await event.getId(note);

                const startDate = await event.parseStartDate();

                const endDate = await event.parseEndDate();

                const eventColor = await event.getEventColor(color);
                const description = await event.getDescription("");

                eventsArray.push({
                    id: id,
                    start: startDate,
                    end: endDate,
                    title: note.file.name,
                    editable: true,
                    color: eventColor,
                    extendedProps: {
                        file: note.file,
                        directory: directory,
                        datePropName: datePropName,
                        colorPropName: event.colorPropName,
                        color: eventColor,
                        descriptionPropName: descriptionPropName,
                        description: description,
                        note: note,
                    }
                });
            }
        }

        return eventsArray;
    }

    async eventChange(changeInfo) {
        // This callback is triggered after an event has been modified in some way.
        // You can access the updated event, related events, old event data, and revert function.
        console.log("Event change");
        console.log(changeInfo);

        let updatedEvent = changeInfo.event;

        let eventNote = new EventNote(updatedEvent.extendedProps.note, updatedEvent.extendedProps.datePropName, updatedEvent.extendedProps.colorPropName, updatedEvent.extendedProps.descriptionPropName);

        await eventNote.updateMetadata(updatedEvent);
    }

    eventClick = (eventClickInfo) =>
    {
        let dvFile = eventClickInfo.event.extendedProps.file;

        if (
            eventClickInfo.jsEvent.getModifierState("Control") ||
            eventClickInfo.jsEvent.getModifierState("Meta")
        ) {
            this.openFile(dvFile.path, true);
        }
        else {
            this.openFile(dvFile.path, false);
        }
    }

    eventMouseEnter = async (eventInfo) => {
        if (
            eventInfo.jsEvent.getModifierState("Control") ||
            eventInfo.jsEvent.getModifierState("Meta")
        ) {
            let popup = new HoverPopup(this.jsPath, eventInfo.event, eventInfo.jsEvent.clientY, eventInfo.jsEvent.clientX);
            await popup.initialize(eventInfo.el);
        }
    }

    openFile(path, newTab = true) {
        let fileToOpen = app.vault.getAbstractFileByPath(path);

        let leaf = app.workspace.getLeaf(newTab);
        leaf.openFile(fileToOpen);
    }

    async changeEventColor(event) {
        let eventNote = new EventNote(event.extendedProps.note, event.extendedProps.datePropName, event.extendedProps.colorPropName, event.extendedProps.descriptionPropName);

        await this.getNewColorThroughModal(event.extendedProps.color, eventNote).then(async (colorString) => {
            if (colorString != null) {
                await eventNote.changeColor(colorString);
                event.color = colorString;

                this.dataView.index.touch();
            }
        });
    }

    async getNewColorThroughModal(currentColor, eventNote){
        return new Promise((resolve) => {
            // Create an instance of the ColorModal class
            const colorModal = new ColorModal(this.jsPath, eventNote);

            // Initialize the color modal
            colorModal.initialize(currentColor).then((selectedColor) => {
                resolve(selectedColor);
            }).catch((_) => {
                resolve(null);
            });
        });
    }

    deleteEvent(event) {
        let eventNote = new EventNote(event.extendedProps.note, event.extendedProps.datePropName, event.extendedProps.colorPropName, event.extendedProps.descriptionPropName);
        eventNote.deleteNote();
    }

    async openContextMenuForEvent(event, mouseEvent) {
        let contextMenu = new ContextMenu(this.jsPath, event, mouseEvent.clientY, mouseEvent.clientX);
        await contextMenu.initialize();

        contextMenu.addToContextMenu("Open File", (ev) => {this.openFile(ev.extendedProps.file.path, false); });
        contextMenu.addToContextMenu("Open File in New Tab", (ev) => {this.openFile(ev.extendedProps.file.path); });
        contextMenu.addDividerToContextMenu();
        contextMenu.addToContextMenu("Delete Event", async (ev) => {
            try {
                this.deleteEvent(ev);
            } catch (error) {
                // Handle and print out the error
                console.error("Something went wrong trying to delete note", error);
            }
        });
        contextMenu.addToContextMenu("Change Event Color", async (ev) => {await this.changeEventColor(ev); });
        contextMenu.addToContextMenu("Edit Event", async (ev) => {
            try {
                let eventEditPopup = new EditEvent(this.jsPath, ev);
                const updatedEvent = await eventEditPopup.initialize();
                let eventNote = new EventNote(updatedEvent.extendedProps.note, updatedEvent.extendedProps.datePropName, updatedEvent.extendedProps.colorPropName, updatedEvent.extendedProps.descriptionPropName);
                await eventNote.updateMetadata(updatedEvent);
            } catch (error) {
                // Handle and print out the error
                console.error(error);
            }
        });

    }
}

module.exports = {
    Calendar
}