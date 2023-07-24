import { DayInterface } from "./interfaces";

// expected format 1-3-2023 for 1st of March 2023 then format date to be valid for API request format
export const formatDate = (date: string): string => {
  console.log("date from fromate date :", date);
  const dateArr = date.split("-");
  // day adjustment
  if (parseInt(dateArr[0]) < 10 && dateArr[0].length === 1)
    dateArr[0] = "0" + dateArr[0];
  // month adjustment
  if (parseInt(dateArr[1]) < 10 && dateArr[1].length === 1)
    dateArr[1] = "0" + dateArr[1];

  return dateArr.reverse().join("-");
};

export const setFixedTimeFrames = (
  timeFrame: string
): { startDate: string; endDate: string } => {
  console.log("date form fixed : ", timeFrame);
  // get today's date to be the end date
  let today = new Date();
  let endDate: string = formatDate(
    `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
  );

  // depending on user selection, set the start date: last week, last month, last year
  let startTime;
  if (timeFrame === "week") {
    startTime = new Date(
      today.getDate() - 7,
      today.getMonth(),
      today.getFullYear()
    );
  } else if (timeFrame === "month") {
    startTime = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
  } else {
    startTime = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    );
  }
  console.log(startTime);
  return {
    startDate: formatDate(
      `${startTime.getFullYear()}-${
        startTime.getMonth() + 1
      }-${startTime.getDate()}`
    ),
    endDate: endDate,
  };
};

// Creating calender days grid
// check if day is today to add specific style highlights it in th UI
const isDateToToday = (year: number, month: number, day: number) => {
  let today = new Date(),
    target = new Date(year, month, day);
  return (
    today.getFullYear() === target.getFullYear() &&
    today.getMonth() === target.getMonth() &&
    today.getDate() === target.getDate()
  );
};

// check if current day is selected
const isDateSelected = (
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  selectedYear: number,
  selectedMonth: number,
  selectedDay: number
) => {
  let selectedDate = new Date(selectedYear, selectedMonth, selectedDay),
    currentDate = new Date(currentYear, currentMonth, currentDay);
  return (
    selectedDate.getFullYear() === currentDate.getFullYear() &&
    selectedDate.getMonth() === currentDate.getMonth() &&
    selectedDate.getDate() === currentDate.getDate()
  );
};

// prevent selecting future dates by disabling day button
// also there is a potential to add validity to prevent select start date after end date
const isDateValid = (year: number, month: number, day: number) => {
  let today = new Date(),
    target = new Date(year, month, day);

  return today.getTime() > target.getTime();
};

// create columns grids consists of 6 rows and 7 columns
export const createDaysGrid = (
  selectedDay: number,
  selectedMonth: number,
  selectedYear: number,
  currentMonth: number,
  currentYear: number,
  startDay: number,
  numberOfDays: number
) => {
  // days array to provide final array of days to be rendered
  const daysArray = [];
  // keep track of day date to render in day button
  let currentDay: number = 1;

  // create first row
  // accepts null in case that month starts any day after SUNDAY or day 0
  let firstRow: (DayInterface | null)[] = [];
  for (let i = 0; i < 7; i++) {
    // if day belong to current month
    if (i >= startDay) {
      firstRow.push({
        day: currentDay,
        isToday: isDateToToday(currentYear, currentMonth, currentDay),
        isSelected: isDateSelected(
          currentYear,
          currentMonth,
          currentDay,
          selectedYear,
          selectedMonth,
          selectedDay
        ),
        isValid: isDateValid(currentYear, currentMonth, currentDay),
      });
      // keep track fo current day to set start point for next group of days
      currentDay++;
    } else {
      // if day does belong to current month
      firstRow.push(null);
    }
  }

  daysArray.push(firstRow);

  // create middle rows
  // current row is placeholder to one week or 7 days
  let currentRow: (DayInterface | null)[] = [];
  for (currentDay; currentDay <= numberOfDays; currentDay++) {
    currentRow.push({
      day: currentDay,
      isToday: isDateToToday(currentYear, currentMonth, currentDay),
      isSelected: isDateSelected(
        currentYear,
        currentMonth,
        currentDay,
        selectedYear,
        selectedMonth,
        selectedDay
      ),
      isValid: isDateValid(currentYear, currentMonth, currentDay),
    });

    // one week completed
    if ((currentDay + startDay) % 7 === 0) {
      // create new row:
      // push current to array of days
      daysArray.push(currentRow);
      //  empty currentRow for new row days
      currentRow = [];
    }
  }
  // after this loop, current row array will contain days with count < 7 which is not enough for 1 week so this will be the last row and complete row with null days to complete 7 days to row prevent bugs in styling if row area were divided on other number than 7 spaces

  // create last row
  // add remaining items in current row
  for (let i = currentRow.length; i < 7; i++) {
    // adding null to make it 7 item to complete full row
    currentRow.push(null);
  }
  daysArray.push(currentRow);

  return daysArray;
};
