const { CryptoBdd } = require("../model/crypto");
const Table = require("cli-table");
const { currencies } = require("./api");

const table = new Table({
  head: [
    "Symbol",
    "Name",
    "Market Cap Rank",
    "Price $",
    "% Change in 1h",
    "% Change in 24h",
    "% Change in 7d"
  ]
});

const showCurrencies = names => {
  currencies.all.forEach(result => {
    names.forEach(name => {
      if (name === result.name) {
        table.push([
          result.symbol,
          result.name,
          result.rank,
          result.price_usd,
          result.percent_change_1h,
          result.percent_change_24h,
          result.percent_change_7d
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
            const request = await CryptoBdd.findAll({where: {name: result.name}});

            if (request.length === 0) {

              CryptoBdd.create({
                idCrypto: result.id,
                name: result.name,
                createdAt: new Date()
              });

              console.log(
              "La monnaie " + result.name + " a été ajoutée à vos favoris"
              );
            } else {
              console.log(
              "La monnaie " +
              result.name +
              " est déjà présente dans vos favoris"
              );
            }
          } catch(err) {
            console.log(err);
          }
        }
      })();
    });
  });
};

const deleteCurrencies = names => {
  names.forEach(name => {
    CryptoBdd.destroy({ where: { name: name } });
    console.log("La monnaie " + name + " a été supprimée de vos favoris");
  });
};

module.exports = {
  showCurrencies,
  saveCurrencies,
  deleteCurrencies
};
