const inquirer = require("inquirer");
const showCurrencies = require("./api.js");

const init = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        type: "checkbox",
        message: "Which crypto-currency do you want to track ?",
        name: "cryptoChoices",
        choices: ["Bitcoin", "Ethereum", "Monero", "Stellar", "Litecoin"]
      }
    ]);

    const cryptoChoices = answers.cryptoChoices;
    showCurrencies(cryptoChoices);

  } catch (err) {
    console.log(err);
  }
};

module.exports = init;
