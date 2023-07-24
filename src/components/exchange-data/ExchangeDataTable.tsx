import { FC } from "react";
import "./exchangeDataTable.css";
import {
  IExchangeDataTableProps,
  IExchangeDataInterface,
} from "../../utilis/interfaces";

const ExchangeDataTable: FC<IExchangeDataTableProps> = ({
  exchangeData,
  startDate,
  endDate,
  fetchingData,
}) => {
  return (
    <>
      {exchangeData.length ? (
        <div>
          <h2>
            Exchange Rate data between <br /> <span>{startDate}</span> &nbsp; &
            &nbsp;
            <span>{endDate}</span>
          </h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>CAD</th>
                <th>EGP</th>
              </tr>
            </thead>
            <tbody>
              {exchangeData.map((er: IExchangeDataInterface) => {
                return (
                  <tr key={er.id}>
                    <td>{er.date}</td>
                    <td>{er.CAD}</td>
                    <td>{er.EGP}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>
          Sorry, no available data for dates between <br />
          {startDate} & {endDate}{" "}
        </h3>
      )}
    </>
  );
};

export default ExchangeDataTable;
