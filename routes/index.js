var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../models/users');
var bcrypt = require('bcrypt');
var uid2 = require('uid2');
var articleModel = require('../models/articlesdb');
const {populate} = require('../models/articlesdb')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async function(req,res,next){
  var userLogPseudo= await userModel.findOne({
    pseudo: req.body.pseudo,
})
  var userLogEmail= await userModel.findOne({
    email: req.body.email,
})

if(userLogEmail == null || userLogPseudo == null){
  var hash = bcrypt.hashSync(req.body.password, 10)
  var newUser = new userModel({
    firstName: req.body.firstName,
     lastName: req.body.lastName,
       pseudo: req.body.pseudo,
        email: req.body.email,
          pwd: hash,
        token: uid2(32) 
})
    try{
      const SavedUser = await newUser.save()
      res.json({token: SavedUser.token, SavedUser ,login: true});
    }catch(error) {
      res.json({msg: error});
    }
  
}else{
  res.json('erreur')
}

  console.log('je suis dans le sign up')
  
})

router.post('/sign-in', async function(req,res,next){
  var userLog = await userModel.findOne({
       pseudo: req.body.pseudo,
})
try{
  if(!userLog){
  res.json({login:false})
  }
  else if(bcrypt.compareSync(req.body.password, userLog.pwd)){
  res.json({login: true, token: userLog.token, userLog }) 
  }else{
    res.json({login:false})
  }

}catch(error) {
res.json({msg: error});
}
})

router.post('/add-wishlist', async function(req,res,next){
  var newArticle = await new articleModel({
    title: req.body.title,
     description: req.body.description,
     urlToImage: req.body.urlToImage,
        sourceid: req.body.sourceid,
          sourcename: req.body.sourcename,
        author: req.body.author 
})
 var articleSelect = await newArticle.save()
try{
  var SavedArticle = await userModel.updateOne({token:req.body.token},{$push:{articlesdb:articleSelect._id}})
  res.json(articleSelect);
}catch(error) {
  res.json({msg: error});
}
} )

router.post('/delete-wishlist', async function(req,res,next){
console.log(req.body.title,'titre')
console.log(req.body._id,'ID')
  var delArticle = await userModel.updateOne({token:req.body.token},{$pull:{articlesdb:req.body._id}})
    const removeWishedList = await articleModel.deleteOne({title:req.body.title})
    res.json(removeWishedList, delArticle);
})

router.post('/displayArt', async function(req,res,next){
  var userSelect = await userModel.findOne({token:req.body.token})
  var articleSelect = await articleModel.find({_id: userSelect.articlesdb})
  res.json(articleSelect)})



module.exports = router;
