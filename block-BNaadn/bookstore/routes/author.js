var express = require(`express`)
var router = express.Router()
var Author = require(`../models/author`)

//handled All Books under Each Author - similarly we can do it for all Categories too!
//Basic Logic established and with a working proof of concept, so moving on



router.get(`/`, (req, res) => {
    Author.find({}, (err, authors) => {
        if(err) console.log(err)
        res.render(`allAuthors`, {authors})

    })
})

router.get(`/add`, (req, res) => {
        res.render(`addAuthor`)

})

router.post(`/add`, (req, res) => {
    Author.create(req.body, (err, author) => {
        if(err) console.log(err)
        res.redirect(`/author`)

    })
})

router.get(`/:id/books`, (req, res) => {
    let id = req.params.id
    console.log(id, "AUTHOR")
    Author.findById(id).populate(`book`).exec((err, author) => {
        if(err) console.log(err)
        
        res.render(`allAuthorBooks`, {author})
    })
})




module.exports = router;