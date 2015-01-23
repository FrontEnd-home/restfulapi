"use strict";

var config = require('../config');
var db = require('../dao/categoryDao');



exports.create = function (req, res, next) {
    var category = req.body ? (req.body.category || {}): {};
    if (category._id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_id是必须没有的'
                    }
                });
    }
    else{
        db.create(category, function (err, row) {
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
    var category = req.body ? (req.body.category || {}): {};
    if (!category._id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
                });
    }
    else{
        db.read(category._id, function (err, row) {
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
                    'body':{'category': row}
                    });
            }
        });
    }
};

exports.update = function (req, res, next) {
    var category = req.body ? (req.body.category || {}): {};
    if (!category._id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
                });
    }
    else{
        db.update(category._id, category, function (err, numberAffected, row) {
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
    var category = req.body ? (req.body.category || {}): {};
    if (!category._id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_id是必须的'
                    }
                });
    }
    else{
        db.delete(category._id, function (err) {
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


exports.readByParentId = function (req, res, next) {
    var category = req.body ? (req.body.category || {}): {};
    if (!category._parent_id) {
        res.send({
                'header':{
                    'code': 1,
                    'message': '_parent_id是必须的'
                    }
                });
    }
    else{
        db.readByParentId(category._parent_id, function (err, rows) {
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
                    'body':{'category': rows}
                    });
            }
        });
        // res.send({
        //     'header':{'code': 0}, 
        //     'body':{'category': result}
        //     });
    }
};