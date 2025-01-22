const express = require("express");
const app = express();
const path = require("path")
const methodoverride = require("method-override")
const { v4: uuidv4 } = require('uuid');


const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}))
app.use(methodoverride('_method'))

let Accounts = [
    {
        id : uuidv4(),
        username : "Abu Shahma",
        info : "Web Developer",
        tweet : "hey this is my first tweet"
    },
    {
        id : uuidv4(),
        username : "Ayaan",
        info : "Bca (Gaya College Gaya)",
        tweet : "hey this is my first tweet"
    },
    {
        id : uuidv4(),
        username : "Baidul Afridi",
        info : "Bca student of (Gaya College Gaya)",
        tweet : "hey this is my first tweet"
    },
]

app.get("/", (req, res) => {
    res.send("Server working well")
})

app.get("/twitter", (req, res) => {
    res.render("index.ejs", {Accounts})
})

app.get("/twitter/tweet", (req, res) => {
    res.render("create.ejs")
})

app.post("/twitter", (req, res) => {
    console.log(req.body);
    
    let id = uuidv4();
    let {username, info, tweet} = req.body;
    Accounts.push({id, username, info, tweet})
    res.redirect("/twitter")
})



app.get('/twitter/:id', (req, res) => {
    let { id } = req.params;
    let Account = Accounts.find((acc) => id === acc.id); // Find the account with the matching ID
    res.render("show.ejs", {Account})
});

app.get("/twitter/:id/edit", (req, res) => {
    let {id} = req.params;
    let Account = Accounts.find((acc) => id === acc.id)
    res.render("edit.ejs", {Account})
})

app.patch("/twitter/:id", (req, res) => {
    let {id} = req.params;
   let {info, tweet} = req.body;
   let Account = Accounts.find((acc) => id === acc.id);
   if (Account) {
    Account.info = info;  // Update the bio with the new value
    Account.tweet = tweet;  // Update the tweet with the new value
}
    res.redirect("/twitter")
})

app.delete("/twitter/:id", (req, res) => {
    let {id} = req.params;
    // Accounts = Accounts.filter((acc) => id === acc.id);
    Accounts = Accounts.filter((acc) => acc.id !== id); 
    res.redirect("/twitter")
})

app.listen(port , () => {
    console.log(`server is listening to port : ${port}`);
    
})

module.exports = app;