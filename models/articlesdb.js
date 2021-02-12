mongoose = require('mongoose');


var ArticleSchema = mongoose.Schema({
  title: String,
  description: String,
  sourceid: String,
  sourcename: String,
  img: String,
  author:String,
});

var articleModel = mongoose.model('myarticles', ArticleSchema);

module.exports = articleModel;
