import { JourneyYear, JourneyCycle, JourneyWeek } from "./types";

export class JourneyCalendar {
  private readonly _currentDateTime: Date = new Date();

  public readonly journeyCalendar: JourneyYear[];

  public readonly currentJourneyCalendar: JourneyYear | undefined;
  public readonly currentJourneyCalendarIndex: number | undefined;

  public readonly lastJourneyCalendar: JourneyYear | undefined;
  public readonly lastJourneyCalendarIndex: number | undefined;

  public readonly currentJourneyCycle: JourneyCycle | undefined;
  public readonly currentJourneyCycleIndex: number | undefined;
  public readonly currentJourneyCycleNames: string[] | undefined;

  public readonly lastJourneyCycle: JourneyCycle | undefined;
  public readonly lastJourneyCycleIndex: number | undefined;

  public readonly currentJourneyWeek: JourneyWeek | undefined;
  public readonly currentJourneyWeekIndex: number | undefined;

  public readonly lastJourneyWeek: JourneyWeek | undefined;
  public readonly lastJourneyWeekIndex: number | undefined;

  private _getCurrentJourneyCalendarDetail() {
    const currentDate = this._currentDateTime;

    const currentJourneyCalendarIndex = this.journeyCalendar.findIndex(
      (journeyCalendar) => {
        const journeyCalendarStartDate = new Date(journeyCalendar.startDate);
        const journeyCalendarEndDate = new Date(journeyCalendar.endDate);

        return (
          journeyCalendarStartDate <= currentDate &&
          journeyCalendarEndDate >= currentDate
        );
      }
    );

    const currentJourneyCalendar =
      this.journeyCalendar[currentJourneyCalendarIndex] ?? undefined;

    const currentJourneyCycleNames = currentJourneyCalendar?.journeyCycles?.map(
      (journeyCycle) => journeyCycle.monthName
    );

    return {
      currentJourneyCalendar: currentJourneyCalendar,
      currentJourneyCalendarIndex: currentJourneyCalendarIndex,
      currentJourneyCycleNames: currentJourneyCycleNames,
    };
  }

  private _getLastJourneyCalendarDetail() {
    if (!this.currentJourneyCalendarIndex) {
      return {
        lastJourneyCalendar: undefined,
        lastJourneyCalendarIndex: undefined,
      };
    }

    const lastJourneyCalendarIndex = this.currentJourneyCalendarIndex - 1;
    const lastJourneyCalendar =
      this.journeyCalendar[lastJourneyCalendarIndex] ?? undefined;

    const lastJourneyCycleNames = lastJourneyCalendar?.journeyCycles?.map(
      (journeyCycle) => journeyCycle.monthName
    );

    return {
      lastJourneyCalendar: lastJourneyCalendar,
      lastJourneyCalendarIndex: lastJourneyCalendarIndex,
      lastJourneyCycleNames: lastJourneyCycleNames,
    };
  }

  private _getCurrentJourneyCycleDetail() {
    const currentDate = this._currentDateTime;

    if (!this.currentJourneyCalendar?.journeyCycles) {
      return {
        currentJourneyCycle: undefined,
        currentJourneyCycleIndex: undefined,
      };
    }

    const currentJourneyCycleIndex =
      this.currentJourneyCalendar?.journeyCycles?.findIndex((journeyMonth) => {
        const journeyMonthStartDate = new Date(journeyMonth.monthStartDate);
        const journeyMonthEndDate = new Date(journeyMonth.monthEndDate);

        return (
          journeyMonthStartDate <= currentDate &&
          journeyMonthEndDate >= currentDate
        );
      });

    const currentJourneyCycle =
      currentJourneyCycleIndex >= 0
        ? this.currentJourneyCalendar?.journeyCycles[currentJourneyCycleIndex]
        : undefined;

    return {
      currentJourneyCycle: currentJourneyCycle,
      currentJourneyCycleIndex: currentJourneyCycleIndex,
    };
  }

  private _getLastJourneyCycleDetail() {
    if (!this.currentJourneyCycleIndex) {
      return {
        lastJourneyCycle: undefined,
        lastJourneyCycleIndex: undefined,
      };
    }

    if (this.currentJourneyCycleIndex === 0) {
      const lastJourneyCalendar = this.lastJourneyCalendar;

      if (!lastJourneyCalendar?.journeyCycles) {
        return {
          lastJourneyCycle: undefined,
          lastJourneyCycleIndex: undefined,
        };
      }

      return {
        lastJourneyCycle:
          lastJourneyCalendar.journeyCycles[
            lastJourneyCalendar.journeyCycles.length - 1
          ],
        lastJourneyCycleIndex: lastJourneyCalendar.journeyCycles.length - 1,
      };
    }

    if (!this.currentJourneyCalendar?.journeyCycles) {
      return {
        lastJourneyCycle: undefined,
        lastJourneyCycleIndex: undefined,
      };
    }

    return {
      lastJourneyCycle:
        this.currentJourneyCalendar?.journeyCycles[
          this.currentJourneyCycleIndex - 1
        ] ?? undefined,
      lastJourneyCycleIndex: this.currentJourneyCycleIndex - 1,
    };
  }

  private _getCurrentJourneyWeekDetail() {
    const currentDate = this._currentDateTime;

    if (!this.currentJourneyCycle?.journeyWeeks) {
      return {
        currentJourneyWeek: undefined,
        currentJourneyWeekIndex: undefined,
      };
    }

    const currentJourneyWeekIndex =
      this.currentJourneyCycle?.journeyWeeks?.findIndex((journeyWeek) => {
        const journeyWeekStartDate = new Date(journeyWeek.weekStartDate);
        const journeyWeekEndDate = new Date(journeyWeek.weekEndDate);

        return (
          journeyWeekStartDate <= currentDate &&
          journeyWeekEndDate >= currentDate
        );
      });

    const currentJourneyWeek =
      currentJourneyWeekIndex >= 0
        ? this.currentJourneyCycle?.journeyWeeks[currentJourneyWeekIndex]
        : undefined;

    return {
      currentJourneyWeek: currentJourneyWeek,
      currentJourneyWeekIndex: currentJourneyWeekIndex,
    };
  }

  private _getLastJourneyWeekDetail() {
    if (!this.currentJourneyWeekIndex) {
      return {
        lastJourneyWeek: undefined,
        lastJourneyWeekIndex: undefined,
      };
    }

    if (this.currentJourneyWeekIndex === 0) {
      const lastJourneyCycle = this.lastJourneyCycle;

      if (!lastJourneyCycle?.journeyWeeks) {
        return {
          lastJourneyWeek: undefined,
          lastJourneyWeekIndex: undefined,
        };
      }

      return {
        lastJourneyWeek:
          lastJourneyCycle.journeyWeeks[
            lastJourneyCycle.journeyWeeks.length - 1
          ],
        lastJourneyWeekIndex: lastJourneyCycle.journeyWeeks.length - 1,
      };
    }

    if (!this.currentJourneyCycle?.journeyWeeks) {
      return {
        lastJourneyWeek: undefined,
        lastJourneyWeekIndex: undefined,
      };
    }

    return {
      lastJourneyWeek:
        this.currentJourneyCycle.journeyWeeks[
          this.currentJourneyWeekIndex - 1
        ] ?? undefined,
      lastJourneyWeekIndex: this.currentJourneyWeekIndex - 1,
    };
  }

  private _sanitizeJourneyCalendarData(data: JourneyYear[]) {
    const sanitizedJourneyCalendarData = data.map((journeyCalendar) => {
      const journeyCalendarStartDate = new Date(journeyCalendar.startDate);
      const journeyCalendarEndDate = new Date(journeyCalendar.endDate);

      journeyCalendarStartDate.setHours(0, 0, 0, 0);
      journeyCalendarEndDate.setHours(23, 59, 59, 999);

      journeyCalendar.startDate = journeyCalendarStartDate.toISOString();
      journeyCalendar.endDate = journeyCalendarEndDate.toISOString();

      journeyCalendar.journeyCycles = journeyCalendar?.journeyCycles?.map(
        (journeyCycle) => {
          const journeyCycleStartDate = new Date(journeyCycle.monthStartDate);
          const journeyCycleEndDate = new Date(journeyCycle.monthEndDate);

          journeyCycleStartDate.setHours(0, 0, 0, 0);
          journeyCycleEndDate.setHours(23, 59, 59, 999);

          journeyCycle.monthStartDate = journeyCycleStartDate.toISOString();
          journeyCycle.monthEndDate = journeyCycleEndDate.toISOString();

          journeyCycle.journeyWeeks = journeyCycle?.journeyWeeks?.map(
            (journeyWeek) => {
              const journeyWeekStartDate = new Date(journeyWeek.weekStartDate);
              const journeyWeekEndDate = new Date(journeyWeek.weekEndDate);

              journeyWeekStartDate.setHours(0, 0, 0, 0);
              journeyWeekEndDate.setHours(23, 59, 59, 999);

              journeyWeek.weekStartDate = journeyWeekStartDate.toISOString();
              journeyWeek.weekEndDate = journeyWeekEndDate.toISOString();

              return journeyWeek;
            }
          );

          return journeyCycle;
        }
      );

      return journeyCalendar;
    });

    return sanitizedJourneyCalendarData;
  }

  constructor(data: JourneyYear[], date?: string | Date) {
    if (date) {
      this._currentDateTime = new Date(date);
    }

    this.journeyCalendar = this._sanitizeJourneyCalendarData(data);

    const currentJourneyCalendarDetail =
      this._getCurrentJourneyCalendarDetail();

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

  public getJourneyCalendar(): JourneyYear[] {
    return this.journeyCalendar;
  }
}
