import { FC } from "react";
import "./fixedPeriods.css";
import { setFixedTimeFrames } from "../../utilis/functions";

export interface IFixedPeriodsProps {
  handleFixedPeriods: (start: string, end: string) => void;
}

export const FixedPeriods: FC<IFixedPeriodsProps> = ({
  handleFixedPeriods,
}) => {
  // Component Methods
  const setLastWeekDates = () => {
    const { startDate, endDate } = setFixedTimeFrames("week");
    handleFixedPeriods(startDate, endDate);
  };
  const setLastMonthDates = () => {
    const { startDate, endDate } = setFixedTimeFrames("month");
    handleFixedPeriods(startDate, endDate);
  };
  const setLastYearDates = () => {
    const { startDate, endDate } = setFixedTimeFrames("year");
    handleFixedPeriods(startDate, endDate);
  };

  return (
    <div className="fixed-periods">
      <button onClick={setLastWeekDates}>Last Week</button>
      <button onClick={setLastMonthDates}>Last Month</button>
      <button onClick={setLastYearDates}>Last Year</button>
    </div>
  );
};
