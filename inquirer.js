const inquirer = require("inquirer");
const { getCurrencies, showCurrencies} = require("./api.js");

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
  } catch (err) {
    console.log(err);
  }
};

module.exports = init;
