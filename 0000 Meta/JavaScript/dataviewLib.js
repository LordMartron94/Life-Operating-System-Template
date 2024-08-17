const root = app.vault.adapter.basePath + "/0000 Meta/JavaScript/";

delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/utils')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/calendar/CalendarLib')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/data/DataInterface')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/stats/DailyNotesReport')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/stats/WeeklyNotesReport')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/stats/SleepNotesReport')];
delete global.require.cache[global.require.resolve(root + 'DataviewLibrary/callout/ElementFactory')];

const utils = require('./DataviewLibrary/utils');
const dataInterface = require('./DataviewLibrary/data/DataInterface');
const calendarLib = require('./DataviewLibrary/calendar/CalendarLib');
const dailyNotesReport = require('./DataviewLibrary/stats/DailyNotesReport');
const weeklyNotesReport = require('./DataviewLibrary/stats/WeeklyNotesReport');
const sleepNotesReport = require('./DataviewLibrary/stats/SleepNotesReport');
const elementFactory = require('./DataviewLibrary/callout/ElementFactory');

module.exports = {
    ...utils,
    ...calendarLib,
    ...dataInterface,
    ...dailyNotesReport,
    ...weeklyNotesReport,
    ...sleepNotesReport,
    ...elementFactory
};
