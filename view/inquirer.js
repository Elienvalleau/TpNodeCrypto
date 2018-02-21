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
const chalk = require("chalk");
const jsonfile = require('jsonfile');

const addFavorites = async () => {
  const resultArray = [];
  try {
    const load = loading(chalk`{yellow Fetching currencies ...}`).start();

    await getCurrencies();
    await inquirer.registerPrompt(
    "search-checkbox",
    require("inquirer-search-checkbox")
    );
    await load.stop();

    const result = await CryptoBdd.findAll();
    result.forEach(result => {
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

    const confirm = await inquirer.prompt([
      {
        type: "confirm",
        message: "Do you want to show your favorites ?",
        name: "confirmShowFavorites",
      }
    ]);

    if(confirm.confirmShowFavorites) {
      await showFavorites();
    }
  } catch (err) {
    console.log(chalk.red(err));
  }
};

const showFavorites = async () => {
  const resultArray = [];
  try {
    const load = loading(chalk`{yellow Fetching currencies ...}`).start();

    await getCurrencies();
    const request = await CryptoBdd.findAll();
    request.forEach(result => {
      resultArray.push(result.name);
    });

    await load.stop();

    showCurrencies(resultArray);
  } catch (err) {
    console.log(chalk.red(err));
  }
};

const deleteFavorites = async () => {
  const resultArray = [];
  try {
    await inquirer.registerPrompt(
    "search-checkbox",
    require("inquirer-search-checkbox")
    );

    const result = await CryptoBdd.findAll();
    result.forEach(result => {
      resultArray.push(result.name);
    });

    const answers = await inquirer.prompt([
      {
        type: "search-checkbox",
        message: "Which crypto-currency do you want to delete ?",
        name: "cryptoChoices",
        choices: resultArray
      }
    ]);

    const cryptoChoices = answers.cryptoChoices;
    deleteCurrencies(cryptoChoices);

    const confirm = await inquirer.prompt([
      {
        type: "confirm",
        message: "Do you want to show your favorites ?",
        name: "confirmShowFavorites",
      }
    ]);

    if(confirm.confirmShowFavorites) {
      await showFavorites();
    }
  } catch (err) {
    console.log(chalk.red(err));
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

const uploadFavorites = async (fileJson) => {
  const resultArray = [];
  try {
    await getCurrencies();
    await jsonfile.readFile(fileJson, async (err, obj) => {
      const promises = [];
      const names = [];
      obj.forEach( async result => {
        promises.push(CryptoBdd.findAll({where: {name: result.name}}));
        names.push(result.name);
      });
      Promise.all(promises).then(data => {
        for(let i = 0; i < data.length; i++) {
          if (data[i].length === 0) {
            resultArray.push(names[i]);
          }
        }
        console.log(resultArray);
        saveCurrencies(resultArray);
      })
    });
  } catch (err) {
    console.dir(err);
  }
};

module.exports = { addFavorites, showFavorites, deleteFavorites, exportFavorites, uploadFavorites };
