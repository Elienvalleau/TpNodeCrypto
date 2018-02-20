const inquirer = require("inquirer");
const { getCurrencies, showCurrencies, saveCurrencies} = require("./api.js");
const { CryptoBdd } = require('./model/crypto');

const init = async () => {
  try {
    console.log("Loading currencies ...");
    const currencies = await getCurrencies();
    await inquirer.registerPrompt("search-checkbox", require("inquirer-search-checkbox"));
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
    let resultArray = [];
    try {
        CryptoBdd.findAll().then(projects => {
            projects.forEach(result => {
              console.log(result.name)
            })
        })
    } catch (err) {
        console.log(err);
    }
};

module.exports = { init, show };
