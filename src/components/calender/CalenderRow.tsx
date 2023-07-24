import { FC } from "react";

import { ICalenderRowProps, DayInterface } from "../../utilis/interfaces";

export const CalenderRow: FC<ICalenderRowProps> = ({
  rowDays,
  handleDateChange,
}) => {
  // Component Methods
  const setDateDay = (day: number) => {
    handleDateChange(day);
  };
  return (
    <div className="calender-row">
      {rowDays.map((date: DayInterface | null) => {
        // if we have a number ( not null ) display day button
        if (date) {
          return (
            <button
              className={`calender-day ${date.isToday ? "isToday" : ""} ${
                date.isSelected ? "isSelected" : ""
              }`}
              key={date.day}
              disabled={!date.isValid}
              onClick={() => setDateDay(date.day)}
            >
              {date.day}
            </button>
          );
        } else {
          return (
            // else display empty button
            <button key={Math.random() * 10000} className="calender-day-empty">
              &nbsp;
            </button>
          );
        }
      })}
    </div>
  );
};
