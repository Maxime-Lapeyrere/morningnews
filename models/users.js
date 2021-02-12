mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  pseudo: String,
  email: String,
  pwd: String,
  token:String,
});

var userModel = mongoose.model('users', UserSchema);

module.exports = userModel;