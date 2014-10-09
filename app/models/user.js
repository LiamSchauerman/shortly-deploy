var crypto = require('crypto');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  username: String,
  password: String

});



var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next){

  bcrypt.hash(this.password, null, null, function(err, result){
    if(err){
      console.log("ERR: ", err);
    } else {
      this.password = result;
      next();
    }
  });
});

userSchema.prototype.comparePassword = function(attempted, callback) {
    bcrypt.compare(attempted, this.password, function(err, isMatch) {
      callback(isMatch);
    });
}

module.exports = User;
