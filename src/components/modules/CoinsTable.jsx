import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import { chartUrl, OPTIONS } from "../services/cryptoApi";

import styles from "./CoinsTable.module.css";

function CoinsTable({ coins, isLoading, currency, setChart, chart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="110"
          width="110"
          strokeColor="#3874ff"
          strokeWidth="3"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow
                key={coin.id}
                coin={coin}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoinsTable;

const TableRow = ({ coin, currency: curr, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
    market_cap,
  } = coin;
  const showHandler = async () => {
    try {
      const data = await fetch(chartUrl(id, curr, 120), OPTIONS);
      const json = await data.json();
      setChart({ ...json, coin, curr });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={id} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {curr === "eur" ? "€" : curr === "jpy" ? "¥" : "$"}
        {current_price.toLocaleString()}
      </td>
      <td className={price_change > 0 ? styles.success : styles.failure}>
        {price_change ? price_change.toFixed(2) : ""}%
      </td>
      <td>
        {curr === "eur" ? "€" : curr === "jpy" ? "¥" : "$"}
        {market_cap.toLocaleString()}
      </td>

      <td>
        {curr === "eur" ? "€" : curr === "jpy" ? "¥" : "$"}
        {total_volume.toLocaleString()}
      </td>
      <td>
        <img
          className={styles.chart}
          src={price_change > 0 ? chartUp : chartDown}
          alt=""
        />
      </td>
    </tr>
  );
};
