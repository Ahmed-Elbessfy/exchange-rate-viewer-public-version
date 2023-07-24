import { FC, useState } from "react";
import "./calender.css";

import { CalenderHeader } from "./CalenderHeader";
import { CalenderBody } from "./CalenderBody";

import { ICalenderProps } from "../../utilis/interfaces";

export const Calender: FC<ICalenderProps> = ({
  setPickedDate,
  selectedDate,
}) => {
  // get current selected date to open calender on selected date if any or today's date
  const [selectedDay, selectedMonth, selectedYear] = selectedDate
    .split("-")
    .map((n) => parseInt(n));

  // Component State
  const [currentMonth, setCurrentMonth] = useState<number>(selectedMonth);
  const [currentYear, setCurrentYear] = useState<number>(selectedYear);

  // Component Methods
  const changeMonth = (value: number): void => {
    // end of year and incrementing to new year
    if (currentMonth === 11 && value === 1) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
      // beginning of year and decrementing to last year
    } else if (currentMonth === 0 && value === -1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth + value);
    }
  };

  const changeYear = (value: number): void => {
    setCurrentYear(currentYear + value);
  };

  const handleDateChange = (day: number): void => {
    setPickedDate(`${day}-${currentMonth + 1}-${currentYear}`);
  };

  return (
    <div className="calender">
      <CalenderHeader
        currentYear={currentYear}
        currentMonth={currentMonth}
        changeMonth={changeMonth}
        changeYear={changeYear}
      />
      <CalenderBody
        currentYear={currentYear}
        currentMonth={currentMonth}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};
