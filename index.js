const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
app.use(express.json());

const userRoute = require("./routes/user")
const PORT = 8000;

mongoose.connect('mongodb+srv://rakesh:rakeshlovescharu@cluster0.krrv7.mongodb.net/blogify').then((e) => console.log("MongoDb connected"));


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/user", userRoute);
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log("server is runnning on ${PORT}");
});