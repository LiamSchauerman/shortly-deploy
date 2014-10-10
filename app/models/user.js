var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  username: String,
  password: String

});


var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next){
 var that = this;
  bcrypt.hash(this.password, null, null, function(err, result){
    if(err){
      console.log("ERR: ", err);
    } else {
      that.password = result;
      next();
    }
  });
});

User.prototype.comparePassword = function(attempted, callback) {
    bcrypt.compare(attempted, this.password, function(err, isMatch) {
      if(err){
        return callback(err);
      }
      callback(isMatch);
    });
}

module.exports = User;
