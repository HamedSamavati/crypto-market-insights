import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";

import styles from "./CoinsTable.module.css";

function CoinsTable({ coins, isLoading, currency }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="130"
          width="130"
          color="grey"
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
              <th>24h</th>
              <th>Total Volume</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow key={coin.id} coin={coin} currency={currency} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CoinsTable;

const TableRow = ({
  coin: {
    id,
    image,
    name,
    symbol,
    current_price,
    price_change_percentage_24h: price_change,
    total_volume,
  },
  currency: curr,
}) => {
  return (
    <tr>
      <td>
        <div className={styles.symbol}>
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
