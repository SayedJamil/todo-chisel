const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    
})


app.listen(3002, () => {
    console.log("server running at port 3002");
});