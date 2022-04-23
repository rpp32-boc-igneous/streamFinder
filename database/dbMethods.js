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
  return User.findOneAndUpdate({ email: user.email }, user, {
    upsert: true,
  });
};

//STREAM Collection Methods
var retrieveAllStreams = () => {
  return Stream.find().sort({ subscribed: -1 });
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

var clearSubs = () => {
  return Stream.updateMany({}, { $set: { subscribed: true } });
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
  clearSubs: clearSubs,
};
