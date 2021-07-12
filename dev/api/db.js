const mysql = require("mysql")

const db = mysql.createConnection({
    user: 'skill17',
    password: 'Shanghai2022',
    database: 'skills_it_02'
})

db.connect()

module.exports = db