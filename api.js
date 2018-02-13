const Client = require('node-rest-client').Client;

const client = new Client();

const callApi = (currency) => {
  client.get(`https://api.coinmarketcap.com/v1/ticker/${currency}`, function (data) {
    console.log(data);
  });
};

module.exports = callApi;