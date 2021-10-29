const _ = require('lodash');
const influx = require('influxdb-nodejs');
// const { getRates } = require('./index');

async function database(data) {
    const dbName = 'textDB';
    const tableName = 'rates';
    const client = new influx(`http://localhost:8086/${dbName}`)
    // {
    //     host: '10.1.10.41',
    //     port: 8086,
    //     protocol: 'http',
    //     username: '',
    //     password: '',
    //     database: dbName
    // }
    const fieldSchema = {
        instrument_id:'s',
        pair:'s',
        rate:'f',
        type:'s'
    };
    const tagSchema = {
        // spdy: ['speedy', 'fast', 'slow'],
        // method: '*',
        // type: ['1','2','3'],
    };
    client.schema('http',fieldSchema,tagSchema,{
        stripUnknown: true,
    });
    _.forEach(data,d=>{
    client.write('http').tag({
        // spdy: 'fast',
        // method: 'GET',
        // type: '1',
    })
    .field(d)
    .then(() => console.info('write point success'))
    .catch(console.error);
    })
    return

    client.query('http')
    .where('type','SWAP')
    // .where('method','GET')
    // .where('use','300','=')
    .then((data) => console.log('success',data.results[0].series[0]))
    .catch(console.error,'err');
//     async.waterfall([
//         (cb) => {
//             client.createDatabase(dbName,(err,result)=>{
//                 ut.log('createDatabase',err);
//                 cb(err,null);
//             })
//         },
//         (result,cb) => {
//             client.getDatabaseName((err,result)=>{
//                 ut.log('getDatabaseName',result);
//                 cb(err,null);
//             })
//         },
//         (result,cb) => {
//             var points = [
//                 {
//                     instId:data[2],fundingTime:data[0],fundingRate:data[1]
//                 }
//             ];
//             client.writePoints(tableName,points,(err,result)=>{
//                 ut.log('writePoints',result);
//                 cb(err,null);
//             })
//         },
//         (result,cb) => {
//             client.query('SELECT * FROM textDB ORDER BY time DESC LIMIT',(err,result)=>{
//                 ut.log(query,result);
//                 cb(err,null);
//             })
//         },
//         (result,cb) => {
//             client.getMeasurements((err,result)=>{
//                 ut.log('getMeasurements',JSON.stringify(result));
//                 cb(err,null);
//             })
//         }
//     ])   
}

module.exports = {
    database
}

// const { Sequelize } = require('sequelize');
// const Influxdb = require('influxdb-v2');
// const influxdbNode = require('influxdb-nodejs');
// const { username } = require('./until');

// const sequelize = new Sequelize('databaes','username','password',{
//     host:'localhost',
//     dialect:'influxdb'
// });

// ( async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('成功连接到数据库')
//     }catch(error){
//         console.error('数据库连接失败')
//     }
// })()

// // Sequelize.define()
// var User = Sequelize.define(user,{
//     firstname:{
//         type:Sequelize.STRING,
//         field:'first_name'
//     }
// })

// const client = new influxdbNode()

// ( async () => {
//     const influxdb = new Influxdb({
//         host:'localhost',
//         token:'myInfluxdbtoken'
//     })
//     await influxdb.write({
//         org,
//         bucket
//     },
//     [{
//         measurement,
//         fields: {
//             load
//         }
//     }])
// })()
