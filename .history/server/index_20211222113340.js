const express = require('express')
const app = express()
const mysql = require('mysql')

const db=mysql.createConnection


app.listen(3002, () => {
    console.log("server running at port 3002");
});