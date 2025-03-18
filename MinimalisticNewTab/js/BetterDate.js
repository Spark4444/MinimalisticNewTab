// This is an improved version of the date class for javascript, i added new functions for better functionality and improved old ones for better usability.
// Store the original functions of the Date object
let originalGetDay = Date.prototype.getDay;
let originalGetMonth = Date.prototype.getMonth;
let originalGetDate = Date.prototype.getDate;
let originalGetYear = Date.prototype.getYear;
let originalGetFullYear = Date.prototype.getFullYear;
let originalGetHours = Date.prototype.getHours;
let originalGetMinutes = Date.prototype.getMinutes;
let originalGetSeconds = Date.prototype.getSeconds;
let originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
// UTC versions of the functions
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

// Add new functions to the Date object

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
            return originalGetMonth.call(this) + 1;
        }
        if (asShort) {
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][originalGetMonth.call(this)];
        }
        if (asNumber) {
            return padZero(originalGetMonth.call(this) + 1);
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][originalGetMonth.call(this)];
    } catch (error) {
        console.error("Error in getMonth:", error);
        return originalGetMonth.call(this);
    }
}

// Function to get the date in new formats as a short version or with a zero added if needed
Date.prototype.getDate = function(asString, asShort) {
    try {
        if (asString && asShort) {
            return this.getDay(false, true);
        }
        if (asString) {
            return this.getDay();
        }
        if (asShort) {
            return originalGetDate.call(this);
        }
        return padZero(originalGetDate.call(this));
    } catch (error) {
        console.error("Error in getDate:", error);
        return originalGetDate.call(this);
    }
}

// Function to get the year either as old version (e.g. it will count from 1900) or the normal year format
Date.prototype.getYear = function(asShort, old) {
    try {
        if (asShort && old) {
            return originalGetYear.call(this).toString().slice(-2);
        }
        if (asShort) {
            return originalGetFullYear.call(this).toString().slice(-2);
        }
        if (old) {
            return originalGetYear.call(this);
        }
        return originalGetFullYear.call(this);
    } catch (error) {
        console.error("Error in getYear:", error);
        return originalGetYear.call(this);
    }
}

// Removed the getFullYear function from the Date object for redundancy since the getYear function does the same thing now
delete Date.prototype.getFullYear;

// Function to get a formatted version of the date, e.g. 12.12.2020 if nothing is specified and you can specify the seperator for and if you need date, month or year and them as their short versions or not
Date.prototype.getFullFormattedDate = function(seperator = ".", date = true, month = [true], year = true) {
    try {
        let sdate = date === true ? this.getDate() : (date ? this.getDate(...date) : "");
        let smonth = month === true ? this.getMonth() : (month ? this.getMonth(...month) : "");
        let syear = year === true ? this.getYear() : (year ? this.getYear(...year) : "");
        return [sdate, smonth, syear].filter(value => value !== "").join(seperator);
    } catch (error) {
        console.error("Error in getFullFormattedDate:", error);
        return "";
    }

}

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
Date.prototype.getTimezoneOffset = function(asMinutes, addGMT = true) {
    try {
        let offset = -originalGetTimezoneOffset.call(this) / 60;
        if (asMinutes) {
            return originalGetTimezoneOffset.call(this);
        }
        offset = offset >= 0 ? `+${offset}` : `${offset}`;
        if (addGMT) {
            offset = `GMT${offset}`;
        }
        return offset;
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
Date.prototype.getZone = function(addBrackets = true) {
    try {
        let output = this.toString().slice(35, this.toString().length - 1);
        if (addBrackets) {
            output = `(${output})`;
        }
        return output;
    } catch (error) {
        console.error("Error in getZone:", error);
        return "";
    }
}

// Function to get the full date in a formatted way, you can specify what you want to include in the output
Date.prototype.getFullDate = function(day = true, month = true, date = true, time = true, offset = true, zone = true) {
    try {
        let sday = day === true ? this.getDay() : (day ? this.getDay(...day) : "");
        let smonth = month === true ? this.getMonth() : (month ? this.getMonth(...month) : "");
        let sdate = date === true ? this.getFullFormattedDate() : (date ? this.getFullFormattedDate(...date) : "");
        let stime = time === true ? this.getFullTime() : (time ? this.getFullTime(...time) : "");
        let soffset = offset === true ? this.getTimezoneOffset() : (offset ? this.getTimezoneOffset(...offset) : "");
        let szone = zone === true ? this.getZone() : (zone ? this.getZone(...zone) : "");
        return [sday, smonth, sdate, stime, soffset, szone].filter(value => value !== "").join(" ");
    }
    catch (error) {
        console.error("Error in getFullDate:", error);
        return "";
    }
}

// Format your date in a custom way, you can use the following formats (e.g. {DDDD} for day of the week as a full string):
// DDDD: Day of the week as a full string
// DDD: Day of the week as a short string version
// DD: Day of the week as a number with a zero
// D: Day of the week as a short version
// dd: Date of the month
// d: Date of the month with a zero
// MMMM: Month of the year as a string
// MMM: Month of the year as a short string version
// MM: Month of the year as a number with a zero
// M: Month of the year as a short version
// yyyy: Year
// yy: Year as a short version
// hh: Hours with a zero
// h: Hours
// mm: Minutes with a zero
// m: Minutes
// ss: Seconds with a zero
// s: Seconds
// o: Timezone offset in hours
// oo: Timezone offset in minutes
// t: Timezone
// C: Continent
// c: Country
// z: Zone
// %{%: {
// %}%: }
Date.prototype.formatDate = function(format) {
    try {
        let map = {
            "DDDD": this.getDay(),
            "DDD": this.getDay(false, true),
            "DD": this.getDay(true),
            "D": this.getDay(true, true),
            "dd": this.getDate(),
            "d": this.getDate(false, true),
            "MMMM": this.getMonth(),
            "MMM": this.getMonth(false, true),
            "MM": this.getMonth(true),
            "M": this.getMonth(true, true),
            "yyyy": this.getYear(),
            "yy": this.getYear(true),
            "hh": this.getHours(),
            "h": this.getHours(true),
            "mm": this.getMinutes(),
            "m": this.getMinutes(true),
            "ss": this.getSeconds(),
            "s": this.getSeconds(true),
            "o": this.getTimezoneOffset(false, false),
            "oo": this.getTimezoneOffset(true, false),
            "t": this.getTimeZone(),
            "C": this.getContinent(),
            "c": this.getCountry(),
            "z": this.getZone(false)
        };

        // Replace %{% and %}% with { and } respectively
        format = format.replace(/%\{%/g, '{').replace(/%\}%/g, '}');

        return format.replace(/{(DDDD|DDD|DD|D|dd|d|MMMM|MMM|MM|M|yyyy|yy|hh|h|mm|m|ss|s|o|oo|t|C|c|z)}/g, matched => map[matched.slice(1, -1)]);
    } catch (error) {
        console.error("Error in formatDate:", error);
        return "";
    }
}
// UTC versions of the functions
// All of them have the same functionality as the functions before but they will be in UTC format

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
            return originalUTCGetMonth.call(this) + 1;
        }
        if (asShort) {
            return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][originalUTCGetMonth.call(this)];
        }
        if (asNumber) {
            return padZero(originalUTCGetMonth.call(this) + 1);
        }
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][originalUTCGetMonth.call(this)];
    } catch (error) {
        console.error("Error in getUTCMonth:", error);
        return originalUTCGetMonth.call(this);
    }
}

Date.prototype.getUTCDate = function(asString, asShort) {
    try {
        if (asString && asShort) {
            return this.getUTCDay(false, true);
        }
        if (asString) {
            return this.getUTCDay();
        }
        if (asShort) {
            return originalUTCGetDate.call(this);
        }
        return padZero(originalUTCGetDate.call(this));
    } catch (error) {
        console.error("Error in getUTCDate:", error);
        return originalUTCGetDate.call(this);
    }
}

Date.prototype.getUTCYear = function(asShort, old) {
    try {
        if (asShort && old) {
            return originalUTCGetFullYear.call(this).toString().slice(-2);
        }
        if (asShort) {
            return originalUTCGetFullYear.call(this).toString().slice(-2);
        }
        if (old) {
            return originalUTCGetFullYear.call(this) - 1900;
        }
        return originalUTCGetFullYear.call(this);
    } catch (error) {
        console.error("Error in getUTCYear:", error);
        return originalUTCGetFullYear.call(this);
    }
}

delete Date.prototype.getUTCFullYear;

Date.prototype.getUTCFullFormattedDate = function(seperator = ".", date = true, month = [true], year = true) {
    try {
        let sdate = date === true ? this.getUTCDate() : (date ? this.getUTCDate(...date) : "");
        let smonth = month === true ? this.getUTCMonth() : (month ? this.getUTCMonth(...month) : "");
        let syear = year === true ? this.getUTCYear() : (year ? this.getUTCYear(...year) : "");
        return [sdate, smonth, syear].filter(value => value !== "").join(seperator);
    } catch (error) {
        console.error("Error in getUTCFullFormattedDate:", error);
        return "";
    }
}

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

// I removed getOffset function from getUTCFullDate because it's not needed in UTC format since it's always 0
Date.prototype.getUTCFullDate = function(day = true, month = true, date = true, time = true, zone = true) {
    try {
        let sday = day === true ? this.getUTCDay() : (day ? this.getUTCDay(...day) : "");
        let smonth = month === true ? this.getUTCMonth() : (month ? this.getUTCMonth(...month) : "");
        let sdate = date === true ? this.getUTCFullFormattedDate() : (date ? this.getUTCFullFormattedDate(...date) : "");
        let stime = time === true ? this.getUTCFullTime() : (time ? this.getUTCFullTime(...time) : "");
        let szone = zone === true ? this.getZone() : (zone ? this.getZone(...zone) : "");
        return [sday, smonth, sdate, stime, szone].filter(value => value !== "").join(" ");
    } catch (error) {
        console.error("Error in getUTCFullDate:", error);
        return "";
    }
}

Date.prototype.formatUTCDate = function(format) {
    try {
        let map = {
            "DDDD": this.getUTCDay(),
            "DDD": this.getUTCDay(false, true),
            "DD": this.getUTCDay(true),
            "D": this.getUTCDay(true, true),
            "dd": this.getUTCDate(),
            "d": this.getUTCDate(false, true),
            "MMMM": this.getUTCMonth(),
            "MMM": this.getUTCMonth(false, true),
            "MM": this.getUTCMonth(true),
            "M": this.getUTCMonth(true, true),
            "yyyy": this.getUTCYear(),
            "yy": this.getUTCYear(true),
            "hh": this.getUTCHours(),
            "h": this.getUTCHours(true),
            "mm": this.getUTCMinutes(),
            "m": this.getUTCMinutes(true),
            "ss": this.getUTCSeconds(),
            "s": this.getUTCSeconds(true),
            "o": this.getTimezoneOffset(false, false),
            "oo": this.getTimezoneOffset(true, false),
            "t": this.getTimeZone(),
            "C": this.getContinent(),
            "c": this.getCountry(),
            "z": this.getZone(false)
        };

        // Replace %{% and %}% with { and } respectively
        format = format.replace(/%\{%/g, '{').replace(/%\}%/g, '}');

        return format.replace(/{(DDDD|DDD|DD|D|dd|d|MMMM|MMM|MM|M|yyyy|yy|hh|h|mm|m|ss|s|o|oo|t|C|c|z)}/g, matched => map[matched.slice(1, -1)]);
    } catch (error) {
        console.error("Error in formatUTCDate:", error);
        return "";
    }
}

// Delete the original functions from the date
delete originalGetDay;
delete originalGetMonth;
delete originalGetDate;
delete originalGetYear;
delete originalGetFullYear;
delete originalGetHours;
delete originalGetMinutes;
delete originalGetSeconds;
delete originalGetTimezoneOffset;
// UTC functions
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