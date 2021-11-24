const { getRates } = require('./utils/index');

function rates() {
    getRates('BINANCE','postgres','','');
}
rates()