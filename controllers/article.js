"use strict";

var config = require('../config');
var db = require('../dao/articleDao');
var consts = require('./const');



exports.create = function (req, res, next) {
    var article = req.body ? (req.body.article || {}): {};
    if (article._id) {
        res.send({
                'header':consts.ARTICLE.CREATE.INPUT_ERROR
                });
    }
    else{
        db.create(article, function (err, row) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                //console.log(row);
                res.send({
                    'header':{'code': 0}, 
                    'body':{'_id': row._id}
                    });
            }
        });
    }
};

exports.read = function (req, res, next) {
    var article = req.body ? (req.body.article || {}): {};
    if (!article._id) {
        res.send({
                'header':consts.ARTICLE.READ.INPUT_ERROR
                });
    }
    else{
        db.read(article._id, function (err, row) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                //console.log(row);
                res.send({
                    'header':{'code': 0}, 
                    'body':{'article': row}
                    });
            }
        });
    }
};

exports.update = function (req, res, next) {
    var article = req.body ? (req.body.article || {}): {};
    if (!article._id) {
        res.send({
                'header':consts.ARTICLE.UPDATE.INPUT_ERROR
                });
    }
    else{
        db.update(article._id, article, function (err, numberAffected, row) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                //console.log(row);
                if (numberAffected == 1){
                    res.send({
                        'header':{'code': 0}, 
                        'body':{'numberAffected': 1}
                        });
                }
                else {          
                    res.send({
                        'header':{'code': 0}, 
                        'body':{'numberAffected': 0}
                        });
                }
            }
        });
    }
};

exports.delete = function (req, res, next) {
    var article = req.body ? (req.body.article || {}): {};
    if (!article._id) {
        res.send({
                'header':consts.ARTICLE.DELETE.INPUT_ERROR
                });
    }
    else{
        db.delete(article._id, function (err) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                //console.log(row);
                res.send({
                    'header':{'code': 0}, 
                    'body':{'numberAffected': 1}
                    });
            }
        });
    }
};


exports.readByCategoryId = function (req, res, next) {
    var category = req.body ? (req.body.category || {}): {};
    if (!category._id) {
        res.send({
                'header':consts.ARTICLE.READ_BY_CATEGORY_ID.INPUT_ERROR
                });
    }
    else{
        db.readByCategoryId(category._id, function (err, rows) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                res.send({
                    'header':{'code': 0}, 
                    'body':{'article': rows}
                    });
            }
        });
    }
};


exports.readByTagId = function (req, res, next) {
    var tag = req.body ? (req.body.tag || {}): {};
    if (!tag._id) {
        res.send({
                'header': consts.ARTICLE.READ_BY_TAG_ID.INPUT_ERROR
                });
    }
    else{
        db.readByTagId(tag._id, function (err, rows) {
            if (err) {
                res.send({
                    'header':{
                        'code': err.code,
                        'message': err.message
                        }
                    });
            }
            else{
                res.send({
                    'header':{'code': 0}, 
                    'body':{'article': rows}
                    });
            }
        });
    }
};