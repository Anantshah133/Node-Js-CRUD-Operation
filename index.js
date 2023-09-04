const connection = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    console.log('server responded')
    res.redirect('/create.html')
})

app.get("/data", (req, res)=>{
    connection.query("SELECT * FROM data", (err, rows)=>{
        if(err) console.log(err)
        else res.render("read.ejs", {rows});
    });
})

app.get("/delete-data", (req,res)=>{
    const deleteQry = "DELETE FROM data WHERE id=?";
    connection.query(deleteQry, [req.query.id], (err,rows)=>{
        if(err) console.log(err)
        else res.redirect("/data");
    })
})

app.get("/update-data", (req, res)=>{
    connection.query("SELECT * FROM data WHERE id=?", [req.query.id], (err, row)=>{
        if(err) console.log(err);
        else {
            const results = JSON.parse(JSON.stringify(row[0]));
            console.log(results);
            res.render("edit.ejs", {results});
        }
    })
})

app.post("/final-update", (req, res)=>{
    const id = req.body.id;
    const email = req.body.email;
    const pass = req.body.pass;
    try{
        connection.query("UPDATE data SET email=?, password=? WHERE id=?", [email, pass, id], (err,rows)=>{
            if(err) console.log(err)
            else res.redirect("/data")
        })
        console.log("Hitted the Update Button");
    } catch (err) {
        console.log(err);
    }
})

app.post("/create.html", (req, res)=>{
    const email = req.body.email;
    const pass = req.body.pass;
    try{
        connection.query("INSERT INTO data (email,password) VALUES(?,?)", [email, pass], (err,rows)=>{
            if(err) console.log(err)
            else res.redirect("/data")
        })
        console.log("Hitted the Submit Button");
    } catch (err) {
        console.log(err);
    }
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log(`The Server is running on port 3000`);
})