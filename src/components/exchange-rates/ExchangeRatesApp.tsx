import { FC, useState } from "react";
import "./exchangeRatesApp.css";
import { FixedPeriods } from "../fixePeriods/FixedPeriods";
import { StartDatePicker } from "../date-pickers/StartDatePicker";
import { EndDatePicker } from "../date-pickers/EndDatePicker";

import { IExchangeDataInterface } from "../../utilis/interfaces";
import { formatDate } from "../../utilis/functions";
import ExchangeDataTable from "../exchange-data/ExchangeDataTable";

// Component State
export const ExchangeRatesApp: FC = () => {
  const [startDate, setStartDate] = useState<string>("DD-MM-YYYY");
  const [endDate, setEndDate] = useState<string>("DD-MM-YYYY");
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [enableFetchData, setEnableFetchData] = useState<boolean>(true);
  const [showExchangeTable, setShowExchangeTable] = useState<boolean>(false);
  const [exchangeData, setExchangeData] = useState<IExchangeDataInterface[]>(
    []
  );
  const [showStartDatePicker, setShowStartDatePicker] =
    useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  // Component methods
  const closeAllDatePickers = () => {
    // check for state value to prevent unneeded rerender due to setting state value
    if (showStartDatePicker) setShowStartDatePicker(false);
    if (showEndDatePicker) setShowEndDatePicker(false);
  };

  const handleShowStartDatePicker = (val: boolean) => {
    // prevent showing 2 date pickers in the same time
    if (showEndDatePicker) setShowEndDatePicker(false);
    setShowStartDatePicker(val);
  };

  const handleShowEndDatePicker = (val: boolean) => {
    // prevent showing 2 date pickers in the same time
    if (showStartDatePicker) setShowStartDatePicker(false);
    setShowEndDatePicker(val);
  };

  const pickNewStartDate = (date: string) => {
    setStartDate(date);
  };
  const pickNewEndDate = (date: string) => {
    setEndDate(date);
  };

  const handleFixedPeriods = (start: string, end: string) => {
    closeAllDatePickers();
    setStartDate(start);
    setEndDate(end);
  };

  const fetchData = () => {
    // disable fetching data while fetching data
    setEnableFetchData(false);
    // close date pickers if opened
    closeAllDatePickers();
    // handling loading while fetching date in first load and after load if already we have data fetched and need to fetch different data
    setExchangeData([]);
    if (fetchingData) setFetchingData(false);
    setShowExchangeTable(true);

    fetch(
      `https://exchangerate/start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(endDate)}`
    )
      .then((result) => result.json())
      .then((result) => {
        let exchangeRates: IExchangeDataInterface[] = [];
        for (let date in result.rates) {
          exchangeRates.push({
            id: Math.random() * 10000,
            date: date,
            EGP: result.rates[date].EGP,
            CAD: result.rates[date].CAD,
          });
        }

        setExchangeData(exchangeRates);

        setFetchingData(true);

        // enable fetching data while fetching data
        setEnableFetchData(true);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <h1>Exchange Rate Viewer</h1>
      <p className="about">
        Here is an Exchange Rate History viewer. You can set a time frame in the
        past and get exchange rate between EGP & CAD. Hope we help you make a
        better decisions.
      </p>
      <p>You can select a fixed time frame from here:</p>
      <FixedPeriods handleFixedPeriods={handleFixedPeriods} />
      <p>Or set a custom time frame from here:</p>

      <div className="custom-periods">
        <div>
          <strong>Start Date:</strong>
          <StartDatePicker
            pickNewStartDate={pickNewStartDate}
            startDate={startDate}
            showStartDatePicker={showStartDatePicker}
            handleShowStartDatePicker={handleShowStartDatePicker}
          />
        </div>
        <div>
          <strong>End Date:</strong>
          <EndDatePicker
            pickNewEndDate={pickNewEndDate}
            endDate={endDate}
            showEndDatePicker={showEndDatePicker}
            handleShowEndDatePicker={handleShowEndDatePicker}
          />
        </div>
      </div>

      {
        <button
          onClick={fetchData}
          className="getData-btn"
          disabled={
            !(
              enableFetchData &&
              startDate !== "DD-MM-YYYY" &&
              endDate !== "DD-MM-YYYY"
            )
          }
        >
          get data
        </button>
      }

      {showExchangeTable ? (
        fetchingData ? (
          <ExchangeDataTable
            exchangeData={exchangeData}
            startDate={startDate}
            endDate={endDate}
            fetchingData={fetchingData}
          />
        ) : (
          <div>Loading ...</div>
        )
      ) : null}
    </>
  );
};
