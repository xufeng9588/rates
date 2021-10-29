const _ = require('lodash');
const { request } = require('./request');
const async = require('async');
const { transformRates } = require('./transform');
const { config } = require('./config');
const { database } = require('./database');

const usdt_coins = config.usdt_coins;

async function getPairs(coins, type, instType) {
    if (!coins || !type || !instType) return
    var hd = [];
    _.forEach(coins, l => {
        const o = `${l}-${type}-${instType}`;
        hd.push(o)
        // console.log(o,type)
    })
    return hd
}

async function getRates(exchange) {
    const pairs = await getPairs(usdt_coins, 'USDT', 'SWAP');
    if(!pairs || !pairs.length) return
    return async.mapLimit(pairs, 2, async function(pair) {
        const url = `http://www.okex.com/api/v5/public/funding-rate-history?instId=${pair}`;
        const res = await request(url);
        const rowData = res.data; //row data
        const handleData = await transformRates(rowData,exchange);
        database(handleData)
        // console.log(handleData,'opopx')
        return handleData
    }, (err, results) => {
        if (err) throw err
        // results is now an array of the response bodies
        // console.log(results) //[[1],[2],[3],...]
            // console.log(ipData)
    })
}

module.exports = {
    getPairs,
    getRates
};