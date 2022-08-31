var mongoose = require(`mongoose`)
var Schema = mongoose.Schema
var Book = require(`../models/book`)
var authorSchema = new Schema({
    name: {type: String, required: true},
    email: String,
    country: String,
    book: [{type: Schema.Types.ObjectId, ref: "Book", required: true}],
})

module.exports = mongoose.model(`Author`, authorSchema)