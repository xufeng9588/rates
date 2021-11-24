const { DBLink } = require('../database/link_influx');
const monitor_pnl = require('./schema/monitor_pnl.json')

const dbLink = new DBLink(host = 'localhost', port = 8086, database = 'bfs'); 

dbLink.loadModelConfigs([monitor_pnl]);


async function savePnlInfo(datas) {
    if (!datas || !datas.length) return;
    if (datas.length === 0) {
        console.warn("no data in this response");
    }
    console.log(datas,'data....');
    await dbLink.batchUpsert('monitor_pnl', datas, { batchN: 1});
}

const datas = [
    {
        time:new Date('2021-11-23T06:05:27.564Z'),
        pnl:1000,
        instance_id:'a'
    },
    {
        time:new Date(),
        pnl:2000,
        instance_id:'b'
    },
    {
        time:new Date('2021-11-23T06:05:27.564Z'),
        pnl:1000,
        instance_id:'c'
    },
    {
        time:new Date(),
        pnl:2000,
        instance_id:'d'
    },
]


savePnlInfo(datas);