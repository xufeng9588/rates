// const pg = require('pg');
// const { getRates } = require('./index')

// async function postgres(data) {
//     var conString = 'tcp://postgres:postgres@localhost/test';
//     var client = new pg.Client(conString);
//     var tem = data;
//     selectSQLString = 'insert into pet(tem) values(' + tem + ')';
//     client.connect((error, results) => {
//         if (error) {
//             console.log('clientConnectionReady Error:' + error.message);
//             client.end();
//             return
//         }
//         console.log('connection success...\n');
//         client.query(selectSQLString, (error, results) => {
//             console.log(error);
//         })
//     })
// }

// module.exports = {
//     postgres
// }
// const client = new Client


const { Client, Pool } = require('pg');

var conString = 'tcp://postgres:postgres@localhost/dbname';

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'dbname',
    password: 'postgres',
    port: 5432
};

const client = new Client(config);
const pool = new Pool(config);

pool.on('error',(err,client)=>{
    console.log('Unexpected error on idle client',err);
    process.exit(-1)
})
pool.connect((err,client,done)=>{
    if (err) throw err
    client.query('SELECT * FROM users WHERE id = $1',[1],(err,res)=>{
        done()
        if (err) {
            console.log(err.stack)
        }else {
            console.log(res.rows[0])
        }
    })
})

client.connect()
// var data = ["000", "bazi", 2, 1, Date.now()];
// var queryLetter = `INSERT INTO bet_user(ADDRESS, CATEGORY, ODDS, AMOUNT, TIMESTAMP) VALUES ($1, $2, $3, $4, $5)`;
var text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
var values = ['brianc', 'brian.m.carlson@gmail.com']

client.query(text,values,(err,res)=>{
    console.log(err ? err.stack : res.rows[0]);
    client.end()
})

// client.query(text, values).then(res => {
//     console.log(res.rows[0])
// })
// .catch(e => console.error(e.stack))

// try {
//     const res = await client.query(text,values);
//     console.log(res.rows[0])
// } catch (err) {
//     console.log(err.stack)
// }

// pool.connect((err,client,done)=>{
//     if(err){
//         return console.error(err)
//     }
//     client.query('SELECT $1::int AS number',)
// })