const axios = require('axios');

const callApi = async (currency) => {
  try {
    const response = await axios.get(`https://api.coinmarketcap.com/v1/ticker/${currency}`);
    console.log(response.data);
  } catch(err) {
    console.log(err);
  }

};



module.exports = callApi;