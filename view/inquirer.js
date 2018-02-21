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
const _ = require("lodash");
const jsonfile = require('jsonfile');

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

    const currenciesNotAlreadyAdded = _.difference(currencies.names, resultArray);

    const answers = await inquirer.prompt([
      {
        type: "search-checkbox",
        message: "Which crypto-currency do you want to track ?",
        name: "cryptoChoices",
        choices: currenciesNotAlreadyAdded
      }
    ]);
    const cryptoChoices = answers.cryptoChoices;
    saveCurrencies(cryptoChoices);

    //Todo "Do you want to show currencies ?"
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

const exportFavorites = async () => {
  const file = 'exports/data.json';
  try {
    const request = await CryptoBdd.findAll();
    jsonfile.writeFileSync(file, request, {spaces: 2, EOL: '\r\n'}, function (err) {
      console.log(err);
    })
  } catch (err) {
    console.log(err);
  }
};


module.exports = { addFavorites, showFavorites, deleteFavorites, exportFavorites };
