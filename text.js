const Sequelize = require('sequelize')
const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host, 
    port: db.port, 
    dialect: 'influxdb', 
    pool: { 
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
})
