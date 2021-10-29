// const { database } = require('./until/database');
const { getRates } = require('./until/index');

function rates() {
    getRates('OKEX');
}
rates()