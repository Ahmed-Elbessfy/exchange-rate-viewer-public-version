import { FC } from "react";
import { ICalenderHeaderProps } from "../../utilis/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const monthsMap = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const CalenderHeader: FC<ICalenderHeaderProps> = ({
  changeMonth,
  changeYear,
  currentMonth,
  currentYear,
}) => {
  // Component Methods
  const incrementMonth = (): void => {
    changeMonth(+1);
  };
  const decrementMonth = (): void => {
    changeMonth(-1);
  };

  const incrementYear = (): void => {
    changeYear(+1);
  };
  const decrementYear = (): void => {
    changeYear(-1);
  };

  return (
    <div className="calender-header">
      <div className="calender-controller">
        <button className="decrement-year" onClick={decrementYear}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="decrement-month" onClick={decrementMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div>
          <p className="current-year">{currentYear}</p>
          <p className="current-month">{monthsMap[currentMonth]}</p>
        </div>
        <button className="increment-month" onClick={incrementMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button className="increment-year" onClick={incrementYear}>
          <FontAwesomeIcon icon={faChevronRight} />
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
