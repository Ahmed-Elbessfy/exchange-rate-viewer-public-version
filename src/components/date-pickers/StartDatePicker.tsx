import { FC } from "react";
import "./datePickers.css";
import { Calender } from "../calender/Calender";
import { IStartDatePickerInterface } from "../../utilis/interfaces";

// get todays date to open calender on by default if no date set yet
const month = new Date().getMonth();
const year = new Date().getFullYear();
const day = new Date().getDate();
export const StartDatePicker: FC<IStartDatePickerInterface> = ({
  pickNewStartDate,
  startDate,
  showStartDatePicker,
  handleShowStartDatePicker,
}) => {
  // Component Methods
  const handleChangeDate = (date: string) => {
    pickNewStartDate(date);
    handleShowStartDatePicker(false);
  };

  // increment month  in startDate since in case of opening calender with selected date, month index is -1 of current actual month
  const modifyDateFormat = (date: string) => {
    let formatedDate: string[] = date.split("-");
    formatedDate[1] = String(parseInt(formatedDate[1]) - 1);
    return formatedDate.join("-");
  };

  return (
    <div className="date-picker-container">
      <div className="input-container">
        <button
          className="date-picker-button"
          onClick={() => handleShowStartDatePicker(!showStartDatePicker)}
        >
          {startDate}
        </button>
        {showStartDatePicker ? (
          <Calender
            setPickedDate={handleChangeDate}
            selectedDate={
              startDate === "DD-MM-YYYY"
                ? `${day}-${month}-${year}`
                : modifyDateFormat(startDate)
            }
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
