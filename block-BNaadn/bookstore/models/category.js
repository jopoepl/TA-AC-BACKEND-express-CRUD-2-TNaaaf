var mongoose = require(`mongoose`)
const book = require("./book")
var Schema = mongoose.Schema

var categorySchema = new Schema({
    name: [{type: String, required: true}],
    books: [{type: Schema.Types.Object, ref: "book"}]
}, {timestamps: true})

module.exports = mongoose.model(`Category`, categorySchema)