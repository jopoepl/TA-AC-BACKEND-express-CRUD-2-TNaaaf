var mongoose = require(`mongoose`)
var Schema = mongoose.Schema
var Author = require(`./author`)

var bookSchema = new Schema({
    title: {type: String, required: true},
    summary: String,
    pages: Number,
    publication: String,
    author: {type:String, required: true},
    cover_img: String, 
    category: [String]
})

module.exports = mongoose.model(`Book`, bookSchema)