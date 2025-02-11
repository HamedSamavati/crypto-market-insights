import { useEffect } from "react";

function Search({ setCurrency, setSearch, search, searchResult }) {
  console.log(search);
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="currency">Currency: </label>
      <select name="currency" onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
        <option value="cad">CAD</option>
      </select>
      <div>
        <ul>
          {searchResult.map((coin) => (
            <li>
              <img src={coin.thumb} alt={coin.symbol} />
              {coin.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Search;
