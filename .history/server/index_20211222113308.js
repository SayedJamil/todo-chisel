const express = require('express')
const app = express()
const mysql = require('mysql')


app.listen(3002, () => {
    console.log("server running at port 3002");
});