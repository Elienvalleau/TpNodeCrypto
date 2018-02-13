const inquirer = require("inquirer");
const callApi = require("./api.js");

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

    cryptoChoices.map(currency => {
      callApi(currency.toLowerCase());
    });
  } catch(err) {
    console.log(err);
  }
};

module.exports = init;
