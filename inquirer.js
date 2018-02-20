const inquirer = require("inquirer");
const { getCurrencies, showCurrencies, saveCurrencies, deleteCurrencies} = require("./api.js");
const { CryptoBdd } = require('./model/crypto');
const loading =  require('loading-cli');

const init = async () => {
  try {
    const load = loading("Fetching currencies").start();

    const currencies = await getCurrencies();
    await inquirer.registerPrompt("search-checkbox", require("inquirer-search-checkbox"));
    await load.stop();
    const answers = await inquirer.prompt([
      {
        type: "search-checkbox",
        message: "Which crypto-currency do you want to track ?",
        name: "cryptoChoices",
        choices: currencies.names,
      }
    ]);
    const cryptoChoices = answers.cryptoChoices;
    showCurrencies(cryptoChoices);
    saveCurrencies(cryptoChoices);

  } catch (err) {
    console.log(err);
  }
};


const show = async () => {
    const resultArray = [];
    try {
        await getCurrencies();
        CryptoBdd.findAll().then(projects => {
            projects.forEach(result => {
              resultArray.push(result.name);
            });
            showCurrencies(resultArray);
        })
    } catch (err) {
        console.log(err);
    }
};


const del = async () => {
    const resultArray = [];
    try {
        console.log("Loading currencies ...");
        await inquirer.registerPrompt("search-checkbox", require("inquirer-search-checkbox"));
        const cryptoName = await CryptoBdd.findAll().then(projects => {
                projects.forEach(result => {
                    resultArray.push(result.name);
                });
                return resultArray
            });
        const answers = await inquirer.prompt([
            {
                type: "search-checkbox",
                message: "Which crypto-currency do you want to delete ?",
                name: "cryptoChoices",
                choices: cryptoName,
            }
        ]);
        const cryptoChoices = answers.cryptoChoices;
        deleteCurrencies(cryptoChoices);

    } catch (err) {
        console.log(err);
    }
};

module.exports = { init, show, del };
