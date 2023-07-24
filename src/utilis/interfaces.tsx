export interface IExchangeDataInterface {
  id: number;
  date: string;
  EGP: number;
  CAD: number;
}

export interface IStartDatePickerInterface {
  pickNewStartDate: (date: string) => void;
  startDate: string;
  showStartDatePicker: boolean;
  handleShowStartDatePicker: (value: boolean) => void;
}

export interface IEndDatePickerInterface {
  pickNewEndDate: (date: string) => void;
  endDate: string;
  showEndDatePicker: boolean;
  handleShowEndDatePicker: (value: boolean) => void;
}

export interface ICalenderProps {
  setPickedDate: (date: string) => void;
  selectedDate: string;
}

export interface ICalenderBodyProps {
  currentYear: number;
  currentMonth: number;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  handleDateChange: (day: number) => void;
}

export interface ICalenderHeaderProps {
  currentYear: number;
  currentMonth: number;
  changeMonth: (value: number) => void;
  changeYear: (value: number) => void;
}

export interface DayInterface {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  isValid: boolean;
}

export interface ICalenderRowProps {
  rowDays: (DayInterface | null)[];
  handleDateChange: (day: number) => void;
}

export interface IExchangeDataTableProps {
  exchangeData: IExchangeDataInterface[];
  startDate: string;
  endDate: string;
  fetchingData: boolean;
}
