const { Title, User, Stream } = require("./index");
const { formatTitleObj, formatUserObj } = require("./objFormatting.js");

// Insert database title record
var insertTitle = (obj) => {
  var formattedObj = formatTitleObj(obj);
  return Title.create(formattedObj);
};

var insertUser = (obj) => {
  var formattedUser = formatUserObj(obj);
  return User.create(formattedObj);
};

var retrieveUser = (id) => {
  return User.find({ id: id });
};

var updateUser = (user) => {
  return User.findOneAndReplace({ id: user.id }, user);
};

//STREAM Collection Methods
var retrieveAllStreams = () => {
  return Stream.find().sort({subscribed: -1});
};

var retrieveOneStream = (name) => {
  return Stream.find({ name: name });
};

var insertStream = (streamObj) => {
  return Stream.create(streamObj);
};

var updateStream = (name, field, val) => {
  return Stream.updateOne({name: name}, {$set: {[field]: val}});
}

module.exports = {
  insertTitle: insertTitle,
  insertUser: insertUser,
  retrieveUser: retrieveUser,
  updateUser: updateUser,
  retrieveAllStreams: retrieveAllStreams,
  retrieveOneStream: retrieveOneStream,
  insertStream: insertStream,
  updateStream: updateStream
}
