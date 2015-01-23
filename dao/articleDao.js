var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');


//exports.setup = function(callback) { callback(null); }

//定义对象模型
var ArticleScheme = new Schema({
    _id:Schema.Types.ObjectId,
    _category_id:Schema.Types.ObjectId,
    title:String,
    desc:String,
    key:String,
    url:String,
    icon:String,
    sort_number:Number,
    tags:[String],
    _creator_uid:Schema.Types.ObjectId,
    create_time:Date,
    update_time:Date
});

mongoose.model('article', ArticleScheme);
var Article = mongoose.model('article');


exports.create = function(article,callback) {

    var newArticle = new Article();
    newArticle = _.extend(newArticle, article);
    newArticle._id = new mongoose.Types.ObjectId;
    // newArticle._category_id = article._category_id;
    // newArticle.title = article.title;
    // newArticle.desc = article.desc;
    // newArticle.key = article.key;
    // newArticle.url = article.url;
    // newArticle.icon = article.icon;
    // newArticle.sort_number = article.sort_number;
    // newArticle.tags = article.tags;
    // newArticle._creator_uid = article._creator_uid;
    newArticle.create_time = new Date;
    newArticle.update_time = new Date;
    newArticle.save(function(err, newArticle){
        if(err){
            util.log("FATAL"+err);
            callback({
                    code:-1,
                    message:err 
                });
        }else{
            callback('', newArticle);
        }
    });

}

exports.read = function(id, callback){
    Article.findOne({_id:id},function(err, doc){
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

exports.update = function(id, article, callback) {
    exports.read(id, function(err, oldArticle) {
        if (err)
            callback({
                        code:-1,
                        message:err 
                    });
        else {
            if (oldArticle){
                //article = _.extend(oldArticle, article);
                // var newArticle = new Article();
                // newArticle._id = article._id;
                // newArticle._category_id = article._category_id;
                // newArticle.title = article.title;
                // newArticle.desc = article.desc;
                // newArticle.key = article.key;
                // newArticle.url = article.url;
                // newArticle.icon = article.icon;
                // newArticle.sort_number = article.sort_number;
                // newArticle.tags = article.tags;
                // newArticle._creator_uid = article._creator_uid;
                // newArticle.create_time = article.create_time;
                // newArticle.update_time = new Date;

                // console.log(newArticle);
                //console.log(article); 
                oldArticle.update(article, _.extend(article, {update_time: new Date}), function(err, numberAffected, raw) {
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