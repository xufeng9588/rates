const _ = require('lodash');
const exmap = [{huobi:'xx'}]

function getPair(instId) {
    if (!instId) return
    const hd = instId.replace('-SWAP', '');
    return hd
}

async function transformRates(datas,exchange){
    if(exchange==='OKEX'&&datas&&datas.length){
        var handleData = [];
        _.forEach(datas,l=>{
            const { instId, instType, fundingRate, fundingTime } = l;
            const date = fundingTime;
            const pair = getPair(instId);
            const type = instType;
            const rate = parseFloat(fundingRate);
            const instrument_id = `${exchange}_${pair}_${type}`//OKEX_BTC-USDT_SWAP  exchange_pair_type_timestemp
            const hd = { date, instrument_id, pair, type, rate ,exchange };
            handleData.push(hd);
        })
        return handleData
    }
}



module.exports = {
    transformRates
}