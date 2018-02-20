const {
  deleteCurrencies,
  saveCurrencies,
  showCurrencies
} = require("../controller/functions");
const inquirer = require("inquirer");
const { getCurrencies } = require("../controller/api.js");
const { CryptoBdd } = require("../model/crypto");
const loading = require("loading-cli");
const { currencies } = require("../controller/api");

const addFavorites = async () => {
  const resultArray = [];
  try {
    const load = loading("Fetching currencies").start();

    await getCurrencies();
    await inquirer.registerPrompt(
      "search-checkbox",
      require("inquirer-search-checkbox")
    );
    await load.stop();

    const request = await CryptoBdd.findAll();
    request.forEach(result => {
        resultArray.push(result.name);
    });

    const answers = await inquirer.prompt([
      {
        type: "search-checkbox",
        message: "Which crypto-currency do you want to track ?",
        name: "cryptoChoices",
        choices: currencies.names
      }
    ]);
    const cryptoChoices = answers.cryptoChoices;
    saveCurrencies(cryptoChoices);
  } catch (err) {
    console.log(err);
  }
};

const showFavorites = async () => {
  const resultArray = [];
  try {
    await getCurrencies();
    const request = await CryptoBdd.findAll();
    request.forEach(result => {
      resultArray.push(result.name);
    });
    showCurrencies(resultArray);
  } catch (err) {
    console.log(err);
  }
};

const deleteFavorites = async () => {
  const resultArray = [];
  try {
    await inquirer.registerPrompt(
      "search-checkbox",
      require("inquirer-search-checkbox")
    );
    const cryptoName = await CryptoBdd.findAll();

    cryptoName.forEach(result => {
      resultArray.push(result.name);
    });

    const answers = await inquirer.prompt([
      {
        type: "search-checkbox",
        message: "Which crypto-currency do you want to delete ?",
        name: "cryptoChoices",
        choices: cryptoName
      }
    ]);
    const cryptoChoices = answers.cryptoChoices;
    deleteCurrencies(cryptoChoices);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addFavorites, showFavorites, deleteFavorites };
