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

var retrieveUserByEmail = (email) => {
  return User.find({ email: email });
};

var updateUser = (user) => {
  console.log("This is the user at the DB Method", user);
  return User.findOneAndUpdate({ email: user.user_email }, user, {
    upsert: true,
  });
};

//STREAM Collection Methods
var retrieveAllStreams = () => {
  return Stream.find();
};

var retrieveOneStream = (name) => {
  return Stream.find({ name: name });
};

var insertStream = (streamObj) => {
  return Stream.create(streamObj);
};

var updateStream = (name, field, val) => {
  return Stream.updateOne({ name: name }, { $set: { [field]: val } });
};

module.exports = {
  insertTitle: insertTitle,
  insertUser: insertUser,
  retrieveUser: retrieveUser,
  retrieveUserByEmail: retrieveUserByEmail,
  updateUser: updateUser,
  retrieveAllStreams: retrieveAllStreams,
  retrieveOneStream: retrieveOneStream,
  insertStream: insertStream,
  updateStream: updateStream,
};
