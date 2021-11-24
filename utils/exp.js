//pg query 
//暂时只是支持风控查询
const Pg = require('pg');

class PgLink {
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        this.linkDb();
    }
    linkDb() {
        const { host } = this.options;
        var config = {
            user: 'postgres',
            host: host,
            database: "dbname",
            password: "postgres",
            port: 5432,
            // 扩展属性
            max: 20, // 连接池最大连接数
            idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
        }
        this.client = new Pg.Pool(config)
    }
    async batchQuery() {
        // console.log(this.options,'....')
        var { query } = this.options;
        return new Promise((resolve, reject) => {
            this.client.connect(async function (err, client, done) {
                if (err) {
                    return console.error('数据库连接出错', err);
                }
                // const sql = `SELECT 
                // global_config -> 'max_hold_amount_usd' AS "max_hold_amount_usd: "
                // FROM strategy.strategy_config WHERE unique_id = 'binance_fengzong2_uswap' LIMIT 11`
                // 简单输出个 Hello World
                await client.query(query, function (err, result) {
                    done();// 释放连接（将其返回给连接池）
                    if (err) {
                        return console.error('查询出错', err);
                    }
                    // console.log(result.rows[0]); //output: Hello World
                    resolve(result.rows[0])
                });
            });
        })
    }
    // async batchInsert(){

    // }
}

async function aa() {
    const dbLink = new PgLink({ host: 'localhost', query: 'SELECT * from users LIMIT 5' });
    const data = await dbLink.batchQuery();
    console.log(data, '..')
}
aa()
module.exports = {
    PgLink
}