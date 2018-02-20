const axios = require("axios");
const Table = require("cli-table");

const table = new Table({
  head: [
    "Symbol",
    "Name",
    "Market Cap Rank",
    "Price $",
    "% Change in 1h",
    "% Change in 24h",
    "% Change in 7d"
  ]
});

const axiosInstance = axios.create({
  baseURL: 'https://api.coinmarketcap.com/v1/ticker/',
  onDownloadProgress: function (progressEvent) {
    console.log(progressEvent);
  },
});

const currencies = {};
currencies["all"] = [];
currencies["names"] = [];
currencies["ids"] = [];

const getCurrencies = async () => {
  try {
    const results = await axiosInstance.get(`https://api.coinmarketcap.com/v1/ticker/?limit=10000`);
    results.data.forEach(result => {
      currencies["all"].push(result);
      currencies["names"].push(result.name);
      currencies["ids"].push(result.id);
    });
    return currencies;
  } catch (err) {
    console.log(err);
  }
};

const showCurrencies = (names) => {
  currencies.all.forEach(result => {
    names.forEach(name => {
      if(name === result.name) {
        table.push([
          result.symbol,
          result.name,
          result.rank,
          result.price_usd,
          result.percent_change_1h,
          result.percent_change_24h,
          result.percent_change_7d
        ]);
      }
    });
  });
  console.log(table.toString());
};

module.exports = { getCurrencies, showCurrencies};
