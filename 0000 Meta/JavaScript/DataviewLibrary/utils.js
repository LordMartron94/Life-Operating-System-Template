function printTypeHierarchy(obj) {
    let currentObj = obj;

    while (currentObj) {
        console.log(currentObj.constructor.name);
        currentObj = Object.getPrototypeOf(currentObj);
    }
}

function printTypeTree(obj, depth = 0) {
    const indent = "  ".repeat(depth);
    for (const key in obj) {
        console.log(`${indent}${key}: ${typeof obj[key]}`);
        if (typeof obj[key] === "object") {
            printTypeTree(obj[key], depth + 1);
        }
    }
}

function UUIDv4()
{
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getNotes(directory, dv)
{
    return dv.pages(`"${directory}"`);
}

function formatDate(date)
{
    const timezoneOffsetMinutes = date.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffsetMinutes / 60));
    const timezoneOffsetMinutesPart = String(Math.abs(timezoneOffsetMinutes % 60)).padStart(2, '0');
    const timezoneOffsetSign = timezoneOffsetMinutes < 0 ? '+' : '-';
    const formattedTimezoneOffset = `${timezoneOffsetSign}${String(timezoneOffsetHours).padStart(2, '0')}:${timezoneOffsetMinutesPart}`;

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}${formattedTimezoneOffset}`;
}

function dateToDatetimeLocalString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date as YYYY-MM-DDTHH:mm
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function isValidColor(color) {
    // Check if the color is a valid hex color or RGB color
    const validHexRegex = /^#([A-Fa-f0-9]{6})$/;
    const validRGBRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;

    return validHexRegex.test(color) || validRGBRegex.test(color);
}

function rgbToHex(rgb) {
    // Check if the input string is already in hex format (starts with #)
    if (/^#([A-Fa-f0-9]{6})$/.test(rgb)) {
        return rgb;
    }

    // Convert RGB to Hex
    const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
    const match = regex.exec(rgb);
    if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // If it's neither a valid RGB nor a valid hex, return it as is
    return rgb;
}

function roundToDecimals(number, decimalPlaces) {
    if (isNaN(number) || isNaN(decimalPlaces) || decimalPlaces < 0) {
        return NaN; // Handle invalid inputs gracefully
    }

    const multiplier = 10 ** decimalPlaces;
    return Math.round(number * multiplier) / multiplier;
}

async function writeToJson(normalizedPath, jsonData) {
    await app.vault.adapter.write(normalizedPath, jsonData)
}

async function readFromJson(normalizedPath) {
    const jsonData = await app.vault.adapter.read(normalizedPath);

    return JSON.parse(jsonData);
}

function getAverageHours(xHourRows, xMinuteRows) {
    let totalMinutes = 0;

    for (let i = 0; i < xHourRows.length; i++) {
        const xHour = xHourRows[i];
        const xHourMinute = xMinuteRows[i];
        const totalMinutesX = xHour * 60 + xHourMinute;
        totalMinutes += totalMinutesX;
    }

    const averageMinutes = totalMinutes / xHourRows.length;
    const averageHours = Math.floor(averageMinutes / 60);
    const remainderMinutes = Math.round(averageMinutes % 60);

    if (totalMinutes === 0)
        return null;

    return `${averageHours}h${remainderMinutes}m`;
}

module.exports = {
    printTypeHierarchy,
    printTypeTree,
    UUIDv4,
    getNotes,
    formatDate,
    dateToDatetimeLocalString,
    isValidColor,
    rgbToHex,
    writeToJson,
    readFromJson,
    roundToDecimals,
    getAverageHours
};