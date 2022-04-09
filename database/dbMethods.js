const { Title, User } = require('./index');
const { formatTitleObj, formatUserObj } = require('./objFormatting.js');


// Insert database title record
var insertTitle = (obj) => {
  var formattedObj = formatTitleObj(obj);
  return Title.create(formattedObj);
}

var insertUser = (obj) => {
  var formattedUser = formatUserObj(obj);
  return User.create(formattedObj)
}

var retrieveUser = (id) => {
  return User.find({ id: id });
}

var updateUser = (user) => {
  return User.findOneAndReplace({ id: user.id }, user);
}


module.exports = {

  insertTitle: insertTitle,
  insertUser: insertUser,
  retrieveUser: retrieveUser,
  updateUser: updateUser

}