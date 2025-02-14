import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { searchUrl } from "../services/cryptoApi";
import styles from "./Search.module.css";

function Search({
  setCurrency,
  setSearch,
  search,
  searchResult,
  setSearchResult,
}) {
  const TODAY = new Date().toLocaleString();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchResult([]);
    if (!search) {
      setIsLoading(false); //id meanwhile fetching search cleared we need to remove loading!!
      return;
    }
    setIsLoading(true);
    const controller = new AbortController();
    const getSearchedCoin = async () => {
      try {
        const res = await fetch(searchUrl(search), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setSearchResult(json.coins);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        } else {
          alert(error.status.error_message);
        }
      }
    };
    getSearchedCoin();
    return () => {
      controller.abort();
    };
  }, [search]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select name="currency" onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">$USD</option>
        <option value="eur">€EUR</option>
        <option value="jpy">¥JPY</option>
        <option value="cad">$CAD</option>
      </select>
      <p>{TODAY}</p>
      {!!search && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines
              width="50px"
              height="50px"
              strokeColor="#3874ff"
              strokeWidth="3"
            />
          ) : (
            <ul>
              {searchResult.map((coin) => (
                <li>
                  <img src={coin.thumb} alt={coin.symbol} />
                  <p>
                    {coin.name}, C-rank: {coin.market_cap_rank}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
