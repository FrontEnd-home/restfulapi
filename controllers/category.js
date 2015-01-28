"use strict";

var config = require('../config');
var db = require('../dao/categoryDao');
var consts = require('./const');



exports.create = function (req, res, next) {
    var category = req.body ? (req.body.category || {}): {};
    if (category._id) {
        res.send({
                'header':consts.CATEGORY.CREATE.INPUT_ERROR
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
                'header':consts.CATEGORY.READ.INPUT_ERROR
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
                'header':consts.CATEGORY.UPDATE.INPUT_ERROR
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
                'header':consts.CATEGORY.DELETE.INPUT_ERROR
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
        // res.send({
        //         'header':consts.CATEGORY.READ_BY_PARENT_ID.INPUT_ERROR
        //         });
        category._parent_id = '000000000000000000000000';
    }
    //else{
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
    //}
};
