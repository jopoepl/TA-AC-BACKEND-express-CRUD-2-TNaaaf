var express = require(`express`)
var router = express.Router()
var Book = require(`../models/book`)
var Category = require(`../models/category`)
var Author = require(`../models/author`)


router.get(`/`, (req, res) => {
    Book.find({}, (err, books) => {
        if (err) console.log(err)
        res.render(`allBooks`, {books})
    })
})


router.get(`/add`, (req, res) => {
        res.render(`addBook`)
})


router.post(`/add`, (req, res) => {
    console.log(req.body)
    Book.create(req.body, (err, book) => {
        console.log(book._id)

        if(err) console.log(err)
        Category.updateOne({name: book.category}, {$push: {books: book._id}}, (err, category)=> {
            if(err) console.log(err)
            Author.updateOne({name: req.body.author}, {$push: {book: book._id}}, (err, author) => {
                res.redirect(`/books`)
            })
        })
    })
})






module.exports = router;