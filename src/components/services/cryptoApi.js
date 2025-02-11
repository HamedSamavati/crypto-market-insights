const BASE_URL = "https://api.coingecko.com/api/v3/";

const getCoinUrl = (page, currency) => {
  return `${BASE_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=25&page=${page}&sparkline=true&price_change_percentage=24h&locale=en&precision=0`;
};

const searchUrl = (search) => {
  return `${BASE_URL}search?query=${search}`;
};
export { getCoinUrl, searchUrl };
