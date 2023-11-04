import { JourneyCalendar, JourneyYear } from "../main";
import { journeyCalendarData } from "./data/journeyCalendarData";

describe("JourneyCalendar", () => {
  describe("constructor", () => {
    const journeyCalendar = new JourneyCalendar(journeyCalendarData);

    it("should return a JourneyCalendar instance", () => {
      expect(journeyCalendar).toBeInstanceOf(JourneyCalendar);
    });
  });

  describe("_sanitizeJourneyCalendarData", () => {
    const journeyCalendar = new JourneyCalendar(journeyCalendarData);
    const sanitizedJourneyCalendarData = journeyCalendar.getJourneyCalendar();

    it("Start date should be 00:00:00 and end date should be 23:59:59", () => {
      sanitizedJourneyCalendarData.forEach((journeyYear: JourneyYear) => {
        const yearStartDate = new Date(journeyYear.startDate);
        const yearEndDate = new Date(journeyYear.endDate);

        expect(new Date(yearStartDate).getHours()).toBe(0);
        expect(new Date(yearStartDate).getMinutes()).toBe(0);
        expect(new Date(yearStartDate).getSeconds()).toBe(0);
        expect(new Date(yearEndDate).getMilliseconds()).toBe(999);

        expect(new Date(yearEndDate).getHours()).toBe(23);
        expect(new Date(yearEndDate).getMinutes()).toBe(59);
        expect(new Date(yearEndDate).getSeconds()).toBe(59);
        expect(new Date(yearEndDate).getMilliseconds()).toBe(999);

        journeyYear?.journeyCycles?.forEach((journeyCycle) => {
          const monthStartDate = new Date(journeyCycle.monthStartDate);
          const monthEndDate = new Date(journeyCycle.monthEndDate);

          expect(new Date(monthStartDate).getHours()).toBe(0);
          expect(new Date(monthStartDate).getMinutes()).toBe(0);
          expect(new Date(monthStartDate).getSeconds()).toBe(0);
          expect(new Date(monthStartDate).getMilliseconds()).toBe(0);

          expect(new Date(monthEndDate).getHours()).toBe(23);
          expect(new Date(monthEndDate).getMinutes()).toBe(59);
          expect(new Date(monthEndDate).getSeconds()).toBe(59);
          expect(new Date(monthEndDate).getMilliseconds()).toBe(999);

          journeyCycle?.journeyWeeks?.forEach((journeyWeek) => {
            const dayStartDate = new Date(journeyWeek.weekStartDate);
            const dayEndDate = new Date(journeyWeek.weekEndDate);

            expect(new Date(dayStartDate).getHours()).toBe(0);
            expect(new Date(dayStartDate).getMinutes()).toBe(0);
            expect(new Date(dayStartDate).getSeconds()).toBe(0);
            expect(new Date(dayStartDate).getMilliseconds()).toBe(0);

            expect(new Date(dayEndDate).getHours()).toBe(23);
            expect(new Date(dayEndDate).getMinutes()).toBe(59);
            expect(new Date(dayEndDate).getSeconds()).toBe(59);
            expect(new Date(dayEndDate).getMilliseconds()).toBe(999);
          });
        });
      });
    });
  });
});
