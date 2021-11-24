const _ = require('lodash');

//获取okex pair
function getPair(instId,exchange) {
    if (instId&&exchange==='OKEX'){
        var hd = instId.replace('-SWAP', '');
    }else if(instId&&exchange==='BINANCE'){
        var h = instId.replace('_PERP', '');
        var hd = h.replace('U',"-U")
    }else if(instId&&exchange==='FTX'){
        var hd = instId.replace('PERP','USD');
    }else if(instId&&exchange==='HUOBI'){
        var hd = instId
    }else return
    return hd
}
//获取url pair
async function getPairs_OKEX(coins, type, instType) {
    if (!coins || !type || !instType) return
    var hd = [];
    _.forEach(coins, l => {
        const o = `${l}-${type}-${instType}`;
        hd.push(o)
        // console.log(o,type)
    })
    return hd
}
async function getPairs_BINANCE(coins, type, instType) {
    if (!coins || !type || !instType) return
    var hd = [];
    _.forEach(coins, l => {
        const o = `${l}${type}_${instType}`;
        hd.push(o)
        // console.log(o,type)
    })
    return hd
}
async function getPairs_FTX(coins, instType) {
    if (!coins || !instType) return
    var hd = [];
    _.forEach(coins, l => {
        const o = `${l}-${instType}`;
        hd.push(o)
        // console.log(o,type)
    })
    return hd
}
async function getPairs_HUOBI(coins, type) {
    if (!coins || !type ) return
    var hd = [];
    _.forEach(coins, l => {
        const o = `${l}-${type}`;
        hd.push(o)
        // console.log(o,type)
    })
    return hd
}

async function transformRates(datas,exchange){
    var handleData = [];
    if(exchange==='OKEX'&&datas&&datas.length){
        _.forEach(datas,l=>{
            const { instrument_id, funding_rate, realized_ratee, interest_rate, funding_time } = l;
            const time = funding_time;
            const pair = getPair(instrument_id,exchange);
            const type = 'SWAP';
            const Rate = parseFloat(funding_rate);
            const instrument_ID = `${exchange}_${pair}_${type}`//OKEX_BTC-USDT_SWAP  exchange_pair_type_timestemp
            const hd = { time, instrument_ID, pair, type, Rate ,exchange };
            handleData.push(hd);
        })
    }else if(exchange==='BINANCE'&&datas&&datas.length){
        _.forEach(datas,l=>{
            const { symbol, fundingRate, fundingTime } = l;
            const time = fundingTime;
            const pair = getPair(symbol,exchange);
            const type = 'SWAP';
            const Rate = parseFloat(fundingRate);
            const instrument_ID = `${exchange}_${pair}_${type}`;
            const hd = { time, instrument_ID, pair, type, Rate, exchange };
            handleData.push(hd);
        })
    }else if(exchange==='FTX'&&datas&&datas.length){
        _.forEach(datas,l=>{
            const { future, rate, time } = l;
            const pair = getPair(future,exchange);
            const type = 'SWAP';
            const Rate = parseFloat(rate);
            const instrument_ID = `${exchange}_${pair}_${type}`;
            const hd = { time, instrument_ID, pair, type, Rate, exchange };
            handleData.push(hd);
        })
    }else if(exchange==='HUOBI'&&datas&&datas.length){
        _.forEach(datas,l=>{
            const { estimated_rate, funding_rate, contract_code, symbol, fee_asset, funding_time, next_funding_time } = l;
            const time = funding_time;
            const pair = getPair(contract_code,exchange);
            const type = 'SWAP';
            const Rate = parseFloat(funding_rate);
            const instrument_ID = `${exchange}_${pair}_${type}`;
            const hd = { time, instrument_ID, pair, type, Rate, exchange };
            handleData.push(hd);
        })
    }else return
    return handleData
}

function transformPG(data){
    const handleData = [];
    _.forEach(data,l=>{
        const hd = [l.exchange,l.instrument_ID,l.pair,l.type,l.Rate,l.time];
        handleData.push(hd)
    })
    return handleData
}


module.exports = {
    transformRates,
    getPairs_OKEX,
    getPairs_BINANCE,
    getPairs_FTX,
    getPairs_HUOBI,
    transformPG
}