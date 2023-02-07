const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

//public ststic path // html files
app.use(express.static(path.join(__dirname, "../public")))

// partials 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views")) 

hbs.registerPartials(path.join(__dirname, "../template/partial"));


// routing

// template engine route 
app.get("", (req, res) => {
    res.render("index.hbs")
})

app.get("", (req, res) => {
    res.send("Home page");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/weather", (req, res) => {
    res.render("Weather");
})

app.get("*", (req, res) => {
    res.render("error", {
        message: "This is not the page you are looking for"
    });
})

app.listen("8000", () => {
    console.log("listening to the port 8000");
    // console.log(process.env.PORT || 8000); for the hosting only. if our project would not run on port 8000, it will automatically be run on the given port.
})