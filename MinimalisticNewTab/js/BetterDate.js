// This is an improved version of the date class for javascript, i added new functions for better functionality and improved old ones for better usability.
// Store the original methods of the Date object
let originalGetDay = Date.prototype.getDay;
let originalGetMonth = Date.prototype.getMonth;
let originalGetDate = Date.prototype.getDate;
let originalGetYear = Date.prototype.getYear;
let originalGetFullYear = Date.prototype.getFullYear;
let originalGetHours = Date.prototype.getHours;
let originalGetMinutes = Date.prototype.getMinutes;
let originalGetSeconds = Date.prototype.getSeconds;
let originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
// UTC versions of the methods
let originalUTCGetDay = Date.prototype.getUTCDay;
let originalUTCGetMonth = Date.prototype.getUTCMonth;
let originalUTCGetDate = Date.prototype.getUTCDate;
let originalUTCGetFullYear = Date.prototype.getUTCFullYear;
let originalUTCGetHours = Date.prototype.getUTCHours;
let originalUTCGetMinutes = Date.prototype.getUTCMinutes;
let originalUTCGetSeconds = Date.prototype.getUTCSeconds;
let originalUTCGetTimezoneOffset = Date.prototype.getUTCOffset;

// Get the timezone options for the user
let timeZoneOptions = Intl.DateTimeFormat().resolvedOptions();

// Function to add a zero to the start of a number if it's length is 1
function padZero(value) {
    try {
        return value.toString().length == 1 ? `0${value}` : value;
    } catch (error) {
        console.error("Error when adding zero:", error);
        return value;
    }
}

// Add new methods to the Date object

// Function to get the day of the week in new formats as a number (e.g. 0-6), short (e.g. Sun-Sat) or long (e.g. Sunday-Saturday)
Date.prototype.getDay = function(asNumber, asShort) {
    try {
        if (asShort && asNumber) {
            return originalGetDay.call(this);
        }
        if (asShort) {
            return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][originalGetDay.call(this)];
        }
        if (asNumber) {
            return padZero(originalGetDay.call(this));
        }
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][originalGetDay.call(this)];
    } catch (error) {
        console.error("Error in getDay:", error);
        return originalGetDay.call(this);
    }
}

// Function to get the month in new formats as a number (e.g. 0-11), short (e.g. Jan-Dec) or long (e.g. January-December)
Date.prototype.getMonth = function(asNumber, asShort) {
    try {
        if (asShort && asNumber) {
            return originalGetMonth.call(this);
        }
        if (asShort) {
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][originalGetMonth.call(this)];
        }
        if (asNumber) {
            return padZero(originalGetMonth.call(this));
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][originalGetMonth.call(this)];
    } catch (error) {
        console.error("Error in getMonth:", error);
        return originalGetMonth.call(this);
    }
}

// Function to get the date in new formats as a short version or with a zero added if needed
Date.prototype.getDate = function(asShort) {
    try {
        return asShort ? originalGetDate.call(this) : padZero(originalGetDate.call(this));
    } catch (error) {
        console.error("Error in getDate:", error);
        return originalGetDate.call(this);
    }
}

// Function to get the year either as old version (e.g. it will count from 1900) or the normal year format
Date.prototype.getYear = function(old) {
    try {
        return old ? originalGetYear.call(this) : originalGetFullYear.call(this);
    } catch (error) {
        console.error("Error in getYear:", error);
        return originalGetYear.call(this);
    }
}

// Removed the getFullYear method from the Date object for redundancy since the getYear method does the same thing now
delete Date.prototype.getFullYear;

// Function to get hours with a zero or without it
Date.prototype.getHours = function(asShort) {
    try {
        return asShort ? originalGetHours.call(this) : padZero(originalGetHours.call(this));
    } catch (error) {
        console.error("Error in getHours:", error);
        return originalGetHours.call(this);
    }
}

// Function to get minutes with a zero or without it
Date.prototype.getMinutes = function(asShort) {
    try {
        return asShort ? originalGetMinutes.call(this) : padZero(originalGetMinutes.call(this));
    } catch (error) {
        console.error("Error in getMinutes:", error);
        return originalGetMinutes.call(this);
    }
}

// Function to get seconds with a zero or without it
Date.prototype.getSeconds = function(asShort) {
    try {
        return asShort ? originalGetSeconds.call(this) : padZero(originalGetSeconds.call(this));
    } catch (error) {
        console.error("Error in getSeconds:", error);
        return originalGetSeconds.call(this);
    }
}

// New function to get a formatted version of the time, e.g. 12:34:56 if nothing is specified and you can specify the seperator for and if you need hours, minutes or seconds and them as their short versions or not
Date.prototype.getFullTime = function(seperator = ":", hours = true, minutes = true, seconds = true, hoursAsShort, minutesAsShort, secondsAsShort) {
    try {
        return [hours ? this.getHours(hoursAsShort) : "", minutes ? this.getMinutes(minutesAsShort) : "", seconds ? this.getSeconds(secondsAsShort) : ""]
            .filter(value => value !== "")
            .join(seperator);
    } catch (error) {
        console.error("Error in getFullTime:", error);
        return "";
    }
}

// Function to get the timezone offset in hours or minutes (e.g. +3 or -180) for UTC format
Date.prototype.getTimezoneOffset = function(asMinutes) {
    try {
        let offset = -originalGetTimezoneOffset.call(this) / 60;
        if (asMinutes) {
            return originalGetTimezoneOffset.call(this);
        }
        return offset >= 0 ? `+${offset}` : `${offset}`;
    } catch (error) {
        console.error("Error in getTimezoneOffset:", error);
        return originalGetTimezoneOffset.call(this);
    }
}

// Function to get the timezone of the user
Date.prototype.getTimeZone = function() {
    try {
        return timeZoneOptions.timeZone;
    } catch (error) {
        console.error("Error in getTimeZone:", error);
        return "";
    }
}

// FUnction to get the continent of the user
Date.prototype.getContinent = function() {
    try {
        return timeZoneOptions.timeZone.split("/")[0];
    } catch (error) {
        console.error("Error in getContinent:", error);
        return "";
    }
}

// Function to get the country where user is located
Date.prototype.getCountry = function() {
    try {
        return timeZoneOptions.timeZone.split("/")[1];
    } catch (error) {
        console.error("Error in getCountry:", error);
        return "";
    }
}

// Function to get the zone where user is located for example: "Eastern European Standard Time"
Date.prototype.getTimeZone = function() {
    try {
        return this.toString().slice(35, this.toString().length - 1);
    } catch (error) {
        console.error("Error in getZone:", error);
        return "";
    }
}

// UTC versions of the methods
// All of them have the same functionality as the methods before but they will be in UTC format

Date.prototype.getUTCDay = function(asNumber, asShort) {
    try {
        if (asShort && asNumber) {
            return originalUTCGetDay.call(this);
        }
        if (asShort) {
            return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][originalUTCGetDay.call(this)];
        }
        if (asNumber) {
            return padZero(originalUTCGetDay.call(this));
        }
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][originalUTCGetDay.call(this)];
    } catch (error) {
        console.error("Error in getUTCDay:", error);
        return originalUTCGetDay.call(this);
    }
}

Date.prototype.getUTCMonth = function(asNumber, asShort) {
    try {
        if (asShort && asNumber) {
            return originalUTCGetMonth.call(this);
        }
        if (asShort) {
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][originalUTCGetMonth.call(this)];
        }
        if (asNumber) {
            return padZero(originalUTCGetMonth.call(this));
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][originalUTCGetMonth.call(this)];
    } catch (error) {
        console.error("Error in getUTCMonth:", error);
        return originalUTCGetMonth.call(this);
    }
}

Date.prototype.getUTCDate = function(asShort) {
    try {
        return asShort ? originalUTCGetDate.call(this) : padZero(originalUTCGetDate.call(this));
    } catch (error) {
        console.error("Error in getUTCDate:", error);
        return originalUTCGetDate.call(this);
    }
}

// Date doesn't have getUTCYear method so i used getUTCFullYear instead
Date.prototype.getUTCYear = function() {
    try {
        return originalUTCGetFullYear.call(this);
    } catch (error) {
        console.error("Error in getUTCYear:", error);
        return originalUTCGetYear.call(this);
    }
}

delete Date.prototype.getUTCFullYear;

Date.prototype.getUTCHours = function(asShort) {
    try {
        return asShort ? originalUTCGetHours.call(this) : padZero(originalUTCGetHours.call(this));
    } catch (error) {
        console.error("Error in getUTCHours:", error);
        return originalUTCGetHours.call(this);
    }
}

Date.prototype.getUTCMinutes = function(asShort) {
    try {
        return asShort ? originalUTCGetMinutes.call(this) : padZero(originalUTCGetMinutes.call(this));
    } catch (error) {
        console.error("Error in getUTCMinutes:", error);
        return originalUTCGetMinutes.call(this);
    }
}

Date.prototype.getUTCSeconds = function(asShort) {
    try {
        return asShort ? originalUTCGetSeconds.call(this) : padZero(originalUTCGetSeconds.call(this));
    } catch (error) {
        console.error("Error in getUTCSeconds:", error);
        return originalUTCGetSeconds.call(this);
    }
}

Date.prototype.getUTCFullTime = function(seperator = ":", hours = true, minutes = true, seconds = true, hoursAsShort, minutesAsShort, secondsAsShort) {
    try {
        return [hours ? this.getUTCHours(hoursAsShort) : "", minutes ? this.getUTCMinutes(minutesAsShort) : "", seconds ? this.getUTCSeconds(secondsAsShort) : ""]
            .filter(value => value !== "")
            .join(seperator);
    } catch (error) {
        console.error("Error in getUTCFullTime:", error);
        return "";
    }
}

// Delete the original methods from the date
delete originalGetDay;
delete originalGetMonth;
delete originalGetDate;
delete originalGetYear;
delete originalGetFullYear;
delete originalGetHours;
delete originalGetMinutes;
delete originalGetSeconds;
delete originalGetTimezoneOffset;
// UTC methods
delete originalUTCGetDay;
delete originalUTCGetMonth;
delete originalUTCGetDate;
delete originalUTCGetFullYear;
delete originalUTCGetHours;
delete originalUTCGetMinutes;
delete originalUTCGetSeconds;
// Varaibles
delete timeZoneOptions;
// Functions
delete padZero;