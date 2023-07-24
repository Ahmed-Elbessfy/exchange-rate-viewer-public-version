import { FC } from "react";
import "./datePickers.css";
import { Calender } from "../calender/Calender";
import { IEndDatePickerInterface } from "../../utilis/interfaces";

// get todays date to open calender on by default if no date set yet
const month = new Date().getMonth();
const year = new Date().getFullYear();
const day = new Date().getDate();
export const EndDatePicker: FC<IEndDatePickerInterface> = ({
  pickNewEndDate,
  endDate,
  showEndDatePicker,
  handleShowEndDatePicker,
}) => {
  // Component Methods
  const handleChangeDate = (date: string) => {
    pickNewEndDate(date);
    handleShowEndDatePicker(false);
  };

  // increment month  in endDate since in case of opening calender with selected date, month index is -1 of current actual month
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
          onClick={() => handleShowEndDatePicker(!showEndDatePicker)}
        >
          {endDate}
        </button>
        {showEndDatePicker ? (
          <Calender
            setPickedDate={handleChangeDate}
            selectedDate={
              endDate === "DD-MM-YYYY" ? `${day}-${month}-${year}-` : modifyDateFormat(endDate)
            }
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
