"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JourneyCalendar = void 0;
class JourneyCalendar {
    /**
     * _getCurrentJourneyCalendarDetail()
     * This function finds the current journey calendar based on the current date and time.
     * It also returns the index of the current journey calendar in the journeyCalendar array and the names of all journey cycles in the current journey calendar.
     * @returns {Object} - An object containing the current journey calendar, its index, and the names of its journey cycles.
     */
    _getCurrentJourneyCalendarDetail() {
        var _a, _b;
        const currentDate = this._currentDateTime;
        const currentJourneyCalendarIndex = this.journeyCalendar.findIndex((journeyCalendar) => {
            const journeyCalendarStartDate = new Date(journeyCalendar.startDate);
            const journeyCalendarEndDate = new Date(journeyCalendar.endDate);
            return (journeyCalendarStartDate <= currentDate &&
                journeyCalendarEndDate >= currentDate);
        });
        const currentJourneyCalendar = (_a = this.journeyCalendar[currentJourneyCalendarIndex]) !== null && _a !== void 0 ? _a : undefined;
        const currentJourneyCycleNames = (_b = currentJourneyCalendar === null || currentJourneyCalendar === void 0 ? void 0 : currentJourneyCalendar.journeyCycles) === null || _b === void 0 ? void 0 : _b.map((journeyCycle) => journeyCycle.monthName);
        return {
            currentJourneyCalendar: currentJourneyCalendar,
            currentJourneyCalendarIndex: currentJourneyCalendarIndex,
            currentJourneyCycleNames: currentJourneyCycleNames,
        };
    }
    /**
     * _getLastJourneyCalendarDetail()
     * This function finds the last journey calendar based on the current journey calendar index.
     * It also returns the index of the last journey calendar in the journeyCalendar array and the names of all journey cycles in the last journey calendar.
     * @returns {Object} - An object containing the last journey calendar, its index, and the names of its journey cycles.
     */
    _getLastJourneyCalendarDetail() {
        var _a, _b;
        if (!this.currentJourneyCalendarIndex) {
            return {
                lastJourneyCalendar: undefined,
                lastJourneyCalendarIndex: undefined,
            };
        }
        const lastJourneyCalendarIndex = this.currentJourneyCalendarIndex - 1;
        const lastJourneyCalendar = (_a = this.journeyCalendar[lastJourneyCalendarIndex]) !== null && _a !== void 0 ? _a : undefined;
        const lastJourneyCycleNames = (_b = lastJourneyCalendar === null || lastJourneyCalendar === void 0 ? void 0 : lastJourneyCalendar.journeyCycles) === null || _b === void 0 ? void 0 : _b.map((journeyCycle) => journeyCycle.monthName);
        return {
            lastJourneyCalendar: lastJourneyCalendar,
            lastJourneyCalendarIndex: lastJourneyCalendarIndex,
            lastJourneyCycleNames: lastJourneyCycleNames,
        };
    }
    /**
     * _getCurrentJourneyCycleDetail()
     * This function finds the current journey cycle based on the current date and time.
     * It also returns the index of the current journey cycle in the journeyCycles array of the current journey calendar.
     * @returns {Object} - An object containing the current journey cycle and its index.
     */
    _getCurrentJourneyCycleDetail() {
        var _a, _b, _c, _d;
        const currentDate = this._currentDateTime;
        if (!((_a = this.currentJourneyCalendar) === null || _a === void 0 ? void 0 : _a.journeyCycles)) {
            return {
                currentJourneyCycle: undefined,
                currentJourneyCycleIndex: undefined,
            };
        }
        const currentJourneyCycleIndex = (_c = (_b = this.currentJourneyCalendar) === null || _b === void 0 ? void 0 : _b.journeyCycles) === null || _c === void 0 ? void 0 : _c.findIndex((journeyMonth) => {
            const journeyMonthStartDate = new Date(journeyMonth.monthStartDate);
            const journeyMonthEndDate = new Date(journeyMonth.monthEndDate);
            return (journeyMonthStartDate <= currentDate &&
                journeyMonthEndDate >= currentDate);
        });
        const currentJourneyCycle = currentJourneyCycleIndex >= 0
            ? (_d = this.currentJourneyCalendar) === null || _d === void 0 ? void 0 : _d.journeyCycles[currentJourneyCycleIndex]
            : undefined;
        return {
            currentJourneyCycle: currentJourneyCycle,
            currentJourneyCycleIndex: currentJourneyCycleIndex,
        };
    }
    /**
     * _getLastJourneyCycleDetail()
     * This function finds the last journey cycle based on the current journey cycle index.
     * It also returns the index of the last journey cycle in the journeyCycles array of the current or last journey calendar.
     * @returns {Object} - An object containing the last journey cycle and its index.
     */
    _getLastJourneyCycleDetail() {
        var _a, _b, _c;
        if (!this.currentJourneyCycleIndex) {
            return {
                lastJourneyCycle: undefined,
                lastJourneyCycleIndex: undefined,
            };
        }
        if (this.currentJourneyCycleIndex === 0) {
            const lastJourneyCalendar = this.lastJourneyCalendar;
            if (!(lastJourneyCalendar === null || lastJourneyCalendar === void 0 ? void 0 : lastJourneyCalendar.journeyCycles)) {
                return {
                    lastJourneyCycle: undefined,
                    lastJourneyCycleIndex: undefined,
                };
            }
            return {
                lastJourneyCycle: lastJourneyCalendar.journeyCycles[lastJourneyCalendar.journeyCycles.length - 1],
                lastJourneyCycleIndex: lastJourneyCalendar.journeyCycles.length - 1,
            };
        }
        if (!((_a = this.currentJourneyCalendar) === null || _a === void 0 ? void 0 : _a.journeyCycles)) {
            return {
                lastJourneyCycle: undefined,
                lastJourneyCycleIndex: undefined,
            };
        }
        return {
            lastJourneyCycle: (_c = (_b = this.currentJourneyCalendar) === null || _b === void 0 ? void 0 : _b.journeyCycles[this.currentJourneyCycleIndex - 1]) !== null && _c !== void 0 ? _c : undefined,
            lastJourneyCycleIndex: this.currentJourneyCycleIndex - 1,
        };
    }
    /**
     * _getCurrentJourneyWeekDetail()
     * This function finds the current journey week based on the current date and time.
     * It also returns the index of the current journey week in the journeyWeeks array of the current journey cycle.
     * @returns {Object} - An object containing the current journey week and its index.
     */
    _getCurrentJourneyWeekDetail() {
        var _a, _b, _c, _d;
        const currentDate = this._currentDateTime;
        if (!((_a = this.currentJourneyCycle) === null || _a === void 0 ? void 0 : _a.journeyWeeks)) {
            return {
                currentJourneyWeek: undefined,
                currentJourneyWeekIndex: undefined,
            };
        }
        const currentJourneyWeekIndex = (_c = (_b = this.currentJourneyCycle) === null || _b === void 0 ? void 0 : _b.journeyWeeks) === null || _c === void 0 ? void 0 : _c.findIndex((journeyWeek) => {
            const journeyWeekStartDate = new Date(journeyWeek.weekStartDate);
            const journeyWeekEndDate = new Date(journeyWeek.weekEndDate);
            return (journeyWeekStartDate <= currentDate &&
                journeyWeekEndDate >= currentDate);
        });
        const currentJourneyWeek = currentJourneyWeekIndex >= 0
            ? (_d = this.currentJourneyCycle) === null || _d === void 0 ? void 0 : _d.journeyWeeks[currentJourneyWeekIndex]
            : undefined;
        return {
            currentJourneyWeek: currentJourneyWeek,
            currentJourneyWeekIndex: currentJourneyWeekIndex,
        };
    }
    /**
     * _getLastJourneyWeekDetail()
     * This function finds the last journey week based on the current journey week index.
     * It also returns the index of the last journey week in the journeyWeeks array of the current or last journey cycle.
     * @returns {Object} - An object containing the last journey week and its index.
     */
    _getLastJourneyWeekDetail() {
        var _a, _b;
        if (!this.currentJourneyWeekIndex) {
            return {
                lastJourneyWeek: undefined,
                lastJourneyWeekIndex: undefined,
            };
        }
        if (this.currentJourneyWeekIndex === 0) {
            const lastJourneyCycle = this.lastJourneyCycle;
            if (!(lastJourneyCycle === null || lastJourneyCycle === void 0 ? void 0 : lastJourneyCycle.journeyWeeks)) {
                return {
                    lastJourneyWeek: undefined,
                    lastJourneyWeekIndex: undefined,
                };
            }
            return {
                lastJourneyWeek: lastJourneyCycle.journeyWeeks[lastJourneyCycle.journeyWeeks.length - 1],
                lastJourneyWeekIndex: lastJourneyCycle.journeyWeeks.length - 1,
            };
        }
        if (!((_a = this.currentJourneyCycle) === null || _a === void 0 ? void 0 : _a.journeyWeeks)) {
            return {
                lastJourneyWeek: undefined,
                lastJourneyWeekIndex: undefined,
            };
        }
        return {
            lastJourneyWeek: (_b = this.currentJourneyCycle.journeyWeeks[this.currentJourneyWeekIndex - 1]) !== null && _b !== void 0 ? _b : undefined,
            lastJourneyWeekIndex: this.currentJourneyWeekIndex - 1,
        };
    }
    /**
     * _sanitizeJourneyCalendarData(data: JourneyYear[])
     * This function takes an array of JourneyYear objects and sanitizes the data.
     * It sets the start and end dates of each journey, journey cycle, and journey week to the start and end of the day respectively.
     * @param {JourneyYear[]} data - The journey calendar data to be sanitized.
     * @returns {JourneyYear[]} - The sanitized journey calendar data.
     */
    _sanitizeJourneyCalendarData(data) {
        const sanitizedJourneyCalendarData = data.map((journeyCalendar) => {
            var _a;
            const journeyCalendarStartDate = new Date(journeyCalendar.startDate);
            const journeyCalendarEndDate = new Date(journeyCalendar.endDate);
            journeyCalendarStartDate.setHours(0, 0, 0, 0);
            journeyCalendarEndDate.setHours(23, 59, 59, 999);
            journeyCalendar.startDate = journeyCalendarStartDate.toISOString();
            journeyCalendar.endDate = journeyCalendarEndDate.toISOString();
            journeyCalendar.journeyCycles = (_a = journeyCalendar === null || journeyCalendar === void 0 ? void 0 : journeyCalendar.journeyCycles) === null || _a === void 0 ? void 0 : _a.map((journeyCycle) => {
                var _a;
                const journeyCycleStartDate = new Date(journeyCycle.monthStartDate);
                const journeyCycleEndDate = new Date(journeyCycle.monthEndDate);
                journeyCycleStartDate.setHours(0, 0, 0, 0);
                journeyCycleEndDate.setHours(23, 59, 59, 999);
                journeyCycle.monthStartDate = journeyCycleStartDate.toISOString();
                journeyCycle.monthEndDate = journeyCycleEndDate.toISOString();
                journeyCycle.journeyWeeks = (_a = journeyCycle === null || journeyCycle === void 0 ? void 0 : journeyCycle.journeyWeeks) === null || _a === void 0 ? void 0 : _a.map((journeyWeek) => {
                    const journeyWeekStartDate = new Date(journeyWeek.weekStartDate);
                    const journeyWeekEndDate = new Date(journeyWeek.weekEndDate);
                    journeyWeekStartDate.setHours(0, 0, 0, 0);
                    journeyWeekEndDate.setHours(23, 59, 59, 999);
                    journeyWeek.weekStartDate = journeyWeekStartDate.toISOString();
                    journeyWeek.weekEndDate = journeyWeekEndDate.toISOString();
                    return journeyWeek;
                });
                return journeyCycle;
            });
            return journeyCalendar;
        });
        return sanitizedJourneyCalendarData;
    }
    constructor(data, date) {
        this._currentDateTime = new Date();
        if (date) {
            this._currentDateTime = new Date(date);
        }
        this.journeyCalendar = this._sanitizeJourneyCalendarData(data);
        const currentJourneyCalendarDetail = this._getCurrentJourneyCalendarDetail();
        this.currentJourneyCalendar =
            currentJourneyCalendarDetail.currentJourneyCalendar;
        this.currentJourneyCalendarIndex =
            currentJourneyCalendarDetail.currentJourneyCalendarIndex;
        this.currentJourneyCycleNames =
            currentJourneyCalendarDetail.currentJourneyCycleNames;
        const lastJourneyCalendarDetail = this._getLastJourneyCalendarDetail();
        this.lastJourneyCalendar = lastJourneyCalendarDetail.lastJourneyCalendar;
        this.lastJourneyCalendarIndex =
            lastJourneyCalendarDetail.lastJourneyCalendarIndex;
        const currentJourneyCycleDetail = this._getCurrentJourneyCycleDetail();
        this.currentJourneyCycle = currentJourneyCycleDetail.currentJourneyCycle;
        this.currentJourneyCycleIndex =
            currentJourneyCycleDetail.currentJourneyCycleIndex;
        const currentJourneyWeekDetail = this._getCurrentJourneyWeekDetail();
        this.currentJourneyWeek = currentJourneyWeekDetail.currentJourneyWeek;
        this.currentJourneyWeekIndex =
            currentJourneyWeekDetail.currentJourneyWeekIndex;
        const lastJourneyCycleDetail = this._getLastJourneyCycleDetail();
        this.lastJourneyCycle = lastJourneyCycleDetail.lastJourneyCycle;
        this.lastJourneyCycleIndex = lastJourneyCycleDetail.lastJourneyCycleIndex;
        const lastJourneyWeekDetail = this._getLastJourneyWeekDetail();
        this.lastJourneyWeek = lastJourneyWeekDetail.lastJourneyWeek;
        this.lastJourneyWeekIndex = lastJourneyWeekDetail.lastJourneyWeekIndex;
    }
    /**
     * getCurrentJourneyCalendar()
     * This function returns the current journey calendar.
     * @returns {JourneyYear} - The current journey calendar.
     */
    getJourneyCalendar() {
        return this.journeyCalendar;
    }
}
exports.JourneyCalendar = JourneyCalendar;
