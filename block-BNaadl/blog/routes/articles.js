var express = require('express');
const { findById, findByIdAndUpdate } = require('../models/article');
var router = express.Router();
var Article = require(`../models/article`)


/* GET home page. */
router.get('/', function(req, res, next) {
    Article.find({}, (err, articles) => {
        if(err) console.log(err)
        res.render('allArticles', { articles: articles });
    })
});

router.get('/add', function(req, res, next) {
        res.render('addArticle');
})

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) console.log(err)
        res.render(`singleArticle`, {article: article})
    })
})

router.get('/:id/edit', function(req, res, next) {
    let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) console.log(err)
        res.render(`updateArticle`, {article: article} )
    })
    
})

router.post('/:id/edit', function(req, res, next) {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, (err, article) => {
        if(err) console.log(err)
        res.redirect(`/articles`)
    })
})

router.get('/:id/delete', function(req, res, next) {
    let id = req.params.id;
    Article.findByIdAndDelete(id, (err, article) => {
        if(err) console.log(err)
        res.redirect(`/articles`)
    })
})



router.get('/:id/like', function(req, res, next) {
    let id = req.params.id;
    Article.findById(id, (err, article) => {
        let articleLikes = article.likes
        Article.findByIdAndUpdate(id, {likes: articleLikes +1} , (err, article) => {
            if(err) console.log(err)
            res.redirect(`/articles/${id}`)
        })
    })
})




router.post('/', function(req, res, next) {
    console.log(req.body)
    Article.create(req.body, (err) => {
        if(err) console.log(err)
        res.redirect(`/articles`)
    })
});





module.exports = router;