const { getRates  } = require('./utils/index');
const { urlMap  } = require('./utils/config');

const OKUrlMap = [
    {
        url:['http://www.okex.com/api/v5/public/funding-rate?instId=${pair}&start=xxxx&end=xxx','http://www.okex.com/api/v5/public/funding-rate?instId=${pair}&start=xxxx&end=xxx'],
        exchange:'OKEX',
        asset_type:'SWAP',
        // interval:'1m',
    }
]

function  rate(){
    getRates(OKUrlMap);
    getRates(BNUrlMap);


}

function kline(){

}