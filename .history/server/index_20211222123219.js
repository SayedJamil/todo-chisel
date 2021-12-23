const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'todolist',
})


app.post('/create', (req, res) => {
    const task = req.body.task
    db.query('INSERT INTO todotasks (taskText) VALUES (?)', [task] ,(err,result)=>);
});

app.listen(3002, () => {
    console.log("server running at port 3002");
});