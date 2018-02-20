const inquirer = require("inquirer");
const { getCurrencies, showCurrencies} = require("./api.js");

const filterCurrencies = async (currencies, answers, input) => {
  input = input || '';
  const inputArray = input.split(' ');

  try {
    return await currencies.filter((currency) => {
      let shouldInclude = true;

      inputArray.forEach((inputChunk) => {
        if (!currency.toLowerCase().includes(inputChunk.toLowerCase())) {
          shouldInclude = false
        }
      });
      return shouldInclude;
    });
  } catch(err) {
    console.log(err);
  }
};

const init = async () => {
  try {
    console.log("Loading currencies ...");
    const currencies = await getCurrencies();
    await inquirer.registerPrompt('checkbox-search', require('inquirer-checkbox-search'));
    const answers = await inquirer.prompt([
      {
        type: "checkbox-search",
        message: "Which crypto-currency do you want to track ?",
        name: "cryptoChoices",
        source: (answers, input) => {
          return filterCurrencies(currencies.names, answers, input)
        }
      }
    ]);

    console.log(answers);
    const cryptoChoices = answers.cryptoChoices;
    showCurrencies(cryptoChoices);

  } catch (err) {
    console.log(err);
  }
};

module.exports = init;
