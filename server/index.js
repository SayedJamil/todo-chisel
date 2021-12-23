const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Sayed@123',
    database: 'todolist',
});
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

app.post('/create', (req, res) => {
    const task = req.body.task;
    const status = req.body.status;
    db.query('INSERT INTO todotasks (taskText,status) VALUES (?,?)', [task, status],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('Values inserted')
            }
        }
    );
}
);

app.get("/task", (req, res) => {
    db.query("SELECT * FROM todotasks", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const task = req.body.task;

    db.query(
        "UPDATE todotasks SET taskText = ? WHERE id = (?)",
        [task, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );

});
app.put("/updatestatus", (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    db.query(
        "UPDATE todotasks SET status = ? WHERE id = (?)",
        [status, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );

});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM todotasks WHERE id = (?)", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


app.listen(3002, () => {
    console.log("server running at port 3001");
});