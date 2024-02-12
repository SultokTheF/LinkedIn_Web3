const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  username: {type: String, unique: true},
  bio: {type: String},
  email: {type: String, unique: true},
  firstname: {type: String},
  lastname: {type: String},
  password: {type: String},
  created_at: {type: Date, default: Date.now},
  wallet_address: {type: String, unique: true}
});

module.exports = model('User', UserSchema);