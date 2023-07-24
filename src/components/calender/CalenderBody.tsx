import { FC } from "react";
import { CalenderRow } from "./CalenderRow";

import { ICalenderBodyProps, DayInterface } from "../../utilis/interfaces";
import { createDaysGrid } from "../../utilis/functions";

export const CalenderBody: FC<ICalenderBodyProps> = ({
  currentMonth,
  currentYear,
  selectedMonth,
  selectedYear,
  selectedDay,
  handleDateChange,
}) => {
  // no need to use state here since values won't change depending on data change
  // get start day of month
  const startDay: number = new Date(currentYear, currentMonth).getDay();
  // get number of days of month
  const numberOfDays: number =
    34 - new Date(currentYear, currentMonth, 34).getDate();

  return (
    <div className="calender-body">
      <div className="calender-body-header">
        {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day, i) => (
          <span key={i}>{day}</span>
        ))}
      </div>
      <div className="calender-days">
        {createDaysGrid(
          selectedDay,
          selectedMonth,
          selectedYear,
          currentMonth,
          currentYear,
          startDay,
          numberOfDays
        ).map((singleRowDays: (DayInterface | null)[], i: number) => (
          <CalenderRow
            key={i}
            rowDays={singleRowDays}
            handleDateChange={handleDateChange}
          />
        ))}
      </div>
    </div>
  );
};
