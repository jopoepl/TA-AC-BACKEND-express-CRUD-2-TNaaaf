var express = require(`express`)
var router = express.Router()
var Book = require(`../models/book`)
var Category = require(`../models/category`)


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
    let categoryData = {}
    categoryData.name = req.body.category.split(`,`)
    Book.create(req.body, (err, book) => {
        if (err) console.log("err", err)
        categoryData.name.forEach((cat, index) => {
            console.log(Category.find({name: cat}).exec());
            return;
            if(Category.find({name: cat}) === undefined){
                Category.create({name: cat, books: book._id}, (err, category) => {
                    if (err) console.log(err)
                } )
                
            } else {
                Category.findOneAndUpdate({name:cat}, {$push: {books: book._id}}, (err, updatedCat) => {
                    if (err) console.log(err)
                })
            }
            if(index === categoryData.name.length -1){
                    res.redirect(`/books`)
            }

        })
    })
})
// })




// req.body.category.forEach(cat => {
//     cat = {$push: {books: req.body._id}}
//     Category.create({cat}, (err, cat) => {
//         if (err) console.log(err)
//         console.log(cat)
//        
//     })
// })








module.exports = router;