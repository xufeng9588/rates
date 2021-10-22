const axios = require('axios');
const _ = require('lodash');

function getRates() {
    const base_url = ['http://www.okex.com/api/v5/public/funding-rate?instId=BTC-USD-SWAP'];
    const rateData = [];
    // const url = `${base_url}${instId}`;
    // ( async () => {
        // for (let index = 0; index < 20; index++) {
            _.forEach(base_url,n=>{
                axios.get(base_url).then((res)=>{
                    // console.log(res)
                    const data = res.data;
                    rateData.push(data);
                    console.log(data)
                })
                setTimeout(() => {
                }, 2000);
            })
        // }
    // })()
    const data = rateData[0];
    process.on('uncaughtException', function(err) {
        console.log(err.stack);
        console.log('NOT exit...');
    });
}
getRates()

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