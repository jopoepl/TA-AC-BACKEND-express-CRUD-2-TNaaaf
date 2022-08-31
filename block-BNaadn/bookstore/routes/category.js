var express = require(`express`)
var router = express.Router()
var Category = require(`../models/category`)



router.get(`/`, (req, res) => {
    Category.find({}, (err, cat) => {
        if(err) console.log(err)
        res.render(`allCategories`, {cat})
    })
})

router.get(`/add`, (req, res) => {
        res.render(`addCategory`)

})

router.post(`/add`, (req, res) => {
    Category.create(req.body, (err, cat) => {
        if(err) console.log(err)
        res.redirect(`/category`)
    })
})







module.exports = router;