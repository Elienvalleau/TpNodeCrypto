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

const showCurrencies = async currencies => {
  const tabPromises = [];
  try {
    currencies.forEach(currency => {
      tabPromises.push(
        axios.get(`https://api.coinmarketcap.com/v1/ticker/${currency}`)
      );
    });

    const results = await axios.all(tabPromises);
    results.forEach(result => {
      const data = result.data[0];
      table.push([
        data.symbol,
        data.name,
        data.rank,
        data.price_usd,
        data.percent_change_1h,
        data.percent_change_24h,
        data.percent_change_7d
      ]);
    });
    console.log(table.toString());
  } catch (err) {
    console.log(err);
  }
};

module.exports = showCurrencies;
