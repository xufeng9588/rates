const _ = require('lodash');
const { request } = require('./request');
const async = require('async');
const { transformRates, getPairs_OKEX, getPairs_BINANCE, getPairs_FTX, getPairs_HUOBI, transformPG } = require('./transform');
const { config } = require('../config/config');
const { influxLink } = require('../../database/influxdb/influx');
const { postgresLink } = require('../../database/postgres/pg');
const { rates } = require('../../database/influxdb/Table_Structure/index');
const { column } = require('../../database/postgres/Table_Structure/index');

const coins = config.coins;
const okex_baseurl = config.okex_baseurl;
const binance_baseurl = config.binance_baseurl;
const ftx_baseurl = config.ftx_baseurl;
const huobi_baseurl = config.huobi_baseurl;

async function getRates(exchange,dbName,queryName,queryKWord) {
    if (exchange === 'OKEX') {
        var pairs = await getPairs_OKEX(coins, 'USDT', 'SWAP');
    } else if (exchange === 'BINANCE') {
        var pairs = await getPairs_BINANCE(coins, 'USD', 'PERP');
    } else if (exchange === 'FTX') {
        var pairs = await getPairs_FTX(coins, 'PERP');
    } else if (exchange === 'HUOBI') {
        var pairs = await getPairs_HUOBI(coins, 'USD')
    }
    if (!pairs || !pairs.length) return
    return async.mapLimit(pairs, 1, async function (pair) {
        if (exchange === 'OKEX') {
            var url = `${okex_baseurl}/api/swap/v3/instruments/${pair}/historical_funding_rate`;
        } else if (exchange === 'BINANCE') {
            var url = `${binance_baseurl}/dapi/v1/fundingRate?symbol=${pair}`;
        } else if (exchange === 'FTX') {
            var url = `${ftx_baseurl}/funding_rates?future=${pair}`
        } else if (exchange === 'HUOBI') {
            var url = `${huobi_baseurl}/swap-api/v1/swap_historical_funding_rate?contract_code=${pair}`
        }
        const res = await request(url);
        if (exchange === 'FTX') {
            var hd = res.result
        } else if (exchange === 'OKEX' || exchange === 'BINANCE') {
            var hd = res;
        } else if (exchange === 'HUOBI') {
            var hd = res.data.data;
        } else return
        const handleData = await transformRates(hd, exchange);
        const { database, tableName, host, field } = rates;
        if (dbName === 'influx') {
            const influxTest = new influxLink({
                database: database,
                tableName: tableName,
                host: host,
                data: handleData,
                field: field
            })
            console.log(handleData)
            // return
            await influxTest.influxDB()
        } else if (dbName === 'postgres') {
            const hd = transformPG(handleData);
            // console.log(hd)
            const postgresTest = new postgresLink({
                database: column.database,
                tableName: column.tableName,
                host: column.host,
                data: hd,
                field: column.field,
                values: column.values,
                query: `SELECT * FROM ${column.tableName} WHERE ${queryName} = $1`,
                keyword: queryKWord
            })
            await postgresTest.pgDBinput()
        }else return
        // database(handleData,rates.field)
        // inputRatesPG(handleData,column)
        // queryData('localhost','SELECT * FROM public.users WHERE exchange = $1','BINANCE')
        // console.log(handleData)
        // return handleData
    }, (err, results) => {
        if (err) throw err
    })
}

module.exports = {
    getRates
};