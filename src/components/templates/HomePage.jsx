import { useState } from "react";
import CoinsTable from "../modules/CoinsTable";
import { useEffect } from "react";
import { getCoinUrl, searchUrl } from "../services/cryptoApi";
import Paginatioin from "../modules/Paginatioin";
import Search from "../modules/Search";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-WT89zoNc7DvavUFcFTP5WTSk",
    },
  };
  useEffect(() => {
    setIsLoading(true);
    const getCoinsData = async () => {
      try {
        const res = await fetch(getCoinUrl(page, currency), options);
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    getCoinsData();
  }, [page, currency]);

  useEffect(() => {
    setSearchResult([]);
    if (!search) return;
    const controller = new AbortController();
    const getSearchedCoin = async () => {
      try {
        const res = await fetch(searchUrl(search), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) {
          setSearchResult(json.coins);
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
    <>
      <div>HomePage</div>
      <Search
        setCurrency={setCurrency}
        setSearch={setSearch}
        search={search}
        searchResult={searchResult}
      />
      <CoinsTable coins={coins} isLoading={isLoading} currency={currency} />
      <Paginatioin page={page} setPage={setPage} />
    </>
  );
}

export default HomePage;
