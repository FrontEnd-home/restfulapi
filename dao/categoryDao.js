var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');


//exports.setup = function(callback) { callback(null); }

//定义对象模型
var CategoryScheme = new Schema({
    _id:Schema.Types.ObjectId,
    _parent_id:Schema.Types.ObjectId,
    key:String,
    name:String,
    sort_number:Number,
    icon:String,
    is_visible:Boolean,
    _creator_uid:Schema.Types.ObjectId,
    create_time:Date
});

mongoose.model('category', CategoryScheme);
var Category = mongoose.model('category');


exports.create = function(category,callback) {

    var newCategory = new Category();
    newCategory = _.extend(newCategory, category);
    newCategory._id = new mongoose.Types.ObjectId;
    newCategory.create_time = new Date;
    newCategory.update_time = new Date;
    newCategory.save(function(err, newCategory){
        if(err){
            util.log("FATAL"+err);
            callback({
                    code:-1,
                    message:err 
                });
        }else{
            callback('', newCategory);
        }
    });

}

exports.read = function(id, callback){
    Category.findOne({_id:id},function(err, doc){
        if (err) {
            util.log('FATAL '+ err);
            callback({
                    code:-1,
                    message:err 
                });
        }
        else{
            callback(null, doc);
        }
    });
}

exports.update = function(id, category, callback) {
    exports.read(id, function(err, oldCategory) {
        if (err)
            callback({
                        code:-1,
                        message:err 
                    });
        else {
            if (oldCategory){
                oldCategory.update(category, category, function(err, numberAffected, raw) {
                //console.log(numberAffected);
                    if (err) {
                        util.log('FATAL '+ err);
                        callback({
                            code:-1,
                            message:err 
                        });
                    } else{
                        callback(null, numberAffected);
                    }
                });
            }
            else{
                callback({
                        code:2,
                        message:"没有找到对应记录" 
                    });
            }
        }
    });
}

exports.delete = function(id, callback) {
    exports.read(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            if (doc){
                util.log(util.inspect(doc));
                //console.log(doc);
                doc.remove(function (err, product) { // 删除不掉的时候会有err
                    if (err) {
                        util.log('FATAL '+ err);
                        callback({
                            code:-1,
                            message:err 
                        });
                    }
                    else{
                        callback(null);
                    }
                });
            }
            else{
                callback({
                        code:1,
                        message:"没有找到对应记录" 
                    });
            }
        }
    });
}



exports.readByParentId = function(parentId, callback){
    Category.find({"_parent_id":parentId}, null, {sort: {'sort_number': 1}},function(err, docs){
        if (err) {
            util.log('FATAL '+ err);
            callback({
                    code:-1,
                    message:err 
                });
        }
        else{
            callback(null, docs);
        }
    });
    //return query.exec();
}