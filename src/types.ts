export interface JourneyWeek {
  weekName: string;
  weekStartDate: string;
  weekEndDate: string;
}

export interface JourneyCycle {
  monthName: string;
  monthStartDate: string;
  monthEndDate: string;
  journeyWeeks?: JourneyWeek[];
}

export interface JourneyYear {
  year: number;
  startDate: string;
  endDate: string;
  journeyCycles?: JourneyCycle[];
}
