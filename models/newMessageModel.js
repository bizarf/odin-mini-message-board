const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewMessageSchema = new Schema({
    text: { type: String, required: true, maxLength: 250 },
    user: { type: String, required: true, maxLength: 50 },
    added: { type: Date },
});

module.exports = mongoose.model("NewMessage", NewMessageSchema);
