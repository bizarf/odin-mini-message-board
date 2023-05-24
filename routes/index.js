const express = require("express");
const router = express.Router();
const NewMessage = require("../models/newMessageModel");

let messages = [];

/* GET home page. */
router.get("/", async function (req, res, next) {
    try {
        // retrieve the messages from the database. if request is successful set the messages array to the array from the database
        const message = await NewMessage.find();
        res.status(200);
        messages = message;
    } catch (err) {
        res.status(200);
        console.log(err);
    }
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

// get the /new page which will render the new message form
router.get("/new", function (req, res, next) {
    res.render("form");
});

// the form has a post method which will run this code
router.post("/new", async function (req, res, next) {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    try {
        // create a new document or update if it exists
        await NewMessage.create({
            text: messageText,
            user: messageUser,
            added: new Date(),
        });
        // if request to create is successful then send the user back to the homepage
        res.status(200).redirect("/");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
