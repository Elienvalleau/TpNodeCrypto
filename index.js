#!/usr/bin/env node
var Client = require('node-rest-client').Client;

var client = new Client();

client.registerMethod("bitcoin", "https://api.coinmarketcap.com/v1/ticker/bitcoin", "GET");

client.methods.bitcoin(function (data) {
    console.log(data);

});