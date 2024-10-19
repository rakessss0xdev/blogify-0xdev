const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) =>{
    return res.render("signin")
});

router.get("/signup", (req, res) =>{
    return res.render("signup")
});

router.get("/signin", (req, res) =>{
    const { email, password } = req.body;   
});


router.post("/signup", async (req, res) =>   {
    const { fullname, email, password, } = req.body
    await User.create({
        fullname,
        email, 
        password,
    });

    return res.redirect("/");
});



module.exports = router