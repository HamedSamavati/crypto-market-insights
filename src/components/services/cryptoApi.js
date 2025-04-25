import CryptoJS from "crypto-js";
import apKey from "../../helpers/helper";

const BASE_URL = "https://api.coingecko.com/api/v3/";
const A_KEY = apKey();
const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": A_KEY,
  },
};

const getCoinUrl = (page, currency) => {
  return `${BASE_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=15&page=${page}&sparkline=true&price_change_percentage=24h&locale=en&precision=0`;
};

const searchUrl = (search) => {
  return `${BASE_URL}search?query=${search}`;
};

const chartUrl = (id, currency, days) => {
  return `${BASE_URL}coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&precision=0`;
};

export { getCoinUrl, searchUrl, chartUrl, OPTIONS };
