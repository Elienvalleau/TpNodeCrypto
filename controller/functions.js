const { CryptoBdd } = require("../model/crypto");
const Table = require("cli-table");
const { currencies } = require("./api");
const chalk = require("chalk");
const { Op } = require("sequelize");

const showCurrencies = names => {
  const table = new Table({
    head: [
      chalk.cyan.bold("Symbol"),
      chalk.cyan.bold("Name"),
      chalk.cyan.bold("Rank"),
      chalk.cyan.bold("Price $"),
      chalk.cyan.bold("Market Cap $"),
      chalk.cyan.bold("% Change in 1h"),
      chalk.cyan.bold("% Change in 24h"),
      chalk.cyan.bold("% Change in 7d"),
    ]
  });

  currencies.all.forEach(result => {
    names.forEach(name => {
      if (name === result.name) {
        let percentChange1h = result.percent_change_1h;
        let percentChange24h = result.percent_change_24h;
        let percentChange7d = result.percent_change_7d;

        if(percentChange1h > 0) {
          percentChange1h = chalk.green(percentChange1h);
        } else if(percentChange1h < 0) {
          percentChange1h = chalk.red(percentChange1h);
        } else {
          percentChange1h = chalk.yellow(percentChange1h);
        }

        if(percentChange24h > 0) {
          percentChange24h = chalk.green(percentChange24h);
        } else if(percentChange24h < 0) {
          percentChange24h = chalk.red(percentChange24h);
        } else {
          percentChange24h = chalk.yellow(percentChange24h);
        }

        if(percentChange7d > 0) {
          percentChange7d = chalk.green(percentChange7d);
        } else if(percentChange7d < 0) {
          percentChange7d = chalk.red(percentChange7d);
        } else {
          percentChange7d = chalk.yellow(percentChange7d);
        }

        table.push([
          result.symbol,
          result.name,
          result.rank,
          result.price_usd,
          result.market_cap_usd,
          percentChange1h,
          percentChange24h,
          percentChange7d
        ]);
      }
    });
  });
  console.log(table.toString());
};

const saveCurrencies = names => {
  currencies.all.forEach(result => {
    names.forEach(name => {
      return (async () => {
        if (name === result.name) {
          try {
            CryptoBdd.create({
              idCrypto: result.id,
              name: result.name,
              createdAt: new Date()
            });
            console.log(chalk`{green \u2713}${result.name} has been added`);
          } catch (err) {
            console.log(chalk.red(err));
          }
        }
      })();
    });
  });
};

const deleteCurrencies = names => {
  names.forEach(name => {
    CryptoBdd.destroy({ where: { name: {[Op.like]: name } }});
    console.log(chalk`{red \u2613}${name} has been removed`);
  });
};

module.exports = {
  showCurrencies,
  saveCurrencies,
  deleteCurrencies
};
