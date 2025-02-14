import CoinsTable from "../modules/CoinsTable";
import Paginatioin from "../modules/Paginatioin";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

import { useState } from "react";
import { useEffect } from "react";
import { getCoinUrl, OPTIONS } from "../services/cryptoApi";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [chart, setChart] = useState(null);

  const options = OPTIONS;
  useEffect(() => {
    setIsLoading(true);
    const getCoinsData = async () => {
      try {
        const res = await fetch(getCoinUrl(page, currency), options);
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCoinsData();
  }, [page, currency]);

  return (
    <>
      <Search
        setCurrency={setCurrency}
        setSearch={setSearch}
        search={search}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <CoinsTable
        coins={coins}
        isLoading={isLoading}
        currency={currency}
        setChart={setChart}
        chart={chart}
      />
      <Paginatioin page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </>
  );
}

export default HomePage;
