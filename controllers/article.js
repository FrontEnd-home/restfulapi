"use strict";

var config = require('../config');
var db = require('../dao/articleDao');



exports.create = function (req, res, next) {
    var article = req.body ? (req.body.article || {}): {};
    if (article._id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_id是必须没有的'
                    }
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
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
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
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
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
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
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
