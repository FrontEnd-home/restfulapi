var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');


//exports.setup = function(callback) { callback(null); }

//定义对象模型
var TagScheme = new Schema({
    _id:Schema.Types.ObjectId,
    key:String,
    name:String,
    alias:String,
    _creator_uid:Schema.Types.ObjectId,
    create_time:Date
});

var Tag = mongoose.model('tag', TagScheme);


exports.create = function(tag,callback) {

    var newTag = new Tag();
    newTag = _.extend(newTag, tag);
    newTag._id = new mongoose.Types.ObjectId;
    newTag.create_time = new Date;
    newTag.update_time = new Date;
    newTag.save(function(err, newTag){
        if(err){
            util.log("FATAL"+err);
            callback({
                    code:-1,
                    message:err 
                });
        }else{
            callback('', newTag);
        }
    });

}

exports.read = function(id, callback){
    Tag.findOne({_id:id},function(err, doc){
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

exports.update = function(id, tag, callback) {
    exports.read(id, function(err, oldTag) {
        if (err)
            callback({
                        code:-1,
                        message:err 
                    });
        else {
            if (oldTag){
                oldTag.update(tag, tag, function(err, numberAffected, raw) {
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

