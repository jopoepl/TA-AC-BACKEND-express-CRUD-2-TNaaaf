var express = require('express');
const { findById, findByIdAndUpdate } = require('../models/article');
var router = express.Router();
var Article = require(`../models/article`)
var Comment = require(`../models/comment`)




router.get('/:id/like', function(req, res, next) {
    let id = req.params.id;
    Comment.findById(id, (err,  comment) => {
        if(err) console.log(err)
        console.log(comment)

        let commentLikes = comment.likes
        Comment.findByIdAndUpdate(id, {likes: commentLikes +1} , (err, article) => {
            if(err) console.log(err)
            res.redirect(`/articles/` + comment.articleId)
        })
    })
})

router.get('/:id/edit', function(req, res, next) {
    let id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if(err) console.log(err)
        res.render(`editComment`, {comment})
    })
})

router.post('/:id/edit', function(req, res, next) {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
        if(err) console.log(err)
        res.redirect(`/articles/` + comment.articleId)
    })
})

router.get('/:id/delete', function(req, res, next) {
    let id = req.params.id;
    Comment.findByIdAndRemove(id, (err, comment) => {
        if(err) console.log(err)
        Article.findByIdAndUpdate(comment.articleId, {$pull: {comments: comment._id}}, (err, article) => {
            res.redirect(`/articles/` + comment.articleId)
        })
    })
})



module.exports = router;