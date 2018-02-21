const axios = require("axios");
const chalk = require("chalk");

const currencies = {};

const getCurrencies = async () => {
  try {
    currencies["all"] = [];
    currencies["names"] = [];
    currencies["ids"] = [];

    const results = await axios(
      `https://api.coinmarketcap.com/v1/ticker/?limit=10000`
    );
    results.data.forEach(result => {
      currencies["all"].push(result);
      currencies["names"].push(result.name);
      currencies["ids"].push(result.id);
    });
  } catch (err) {
    console.log(chalk.red(err));
  }
};

module.exports = {
  getCurrencies,
  currencies
};
