const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Xtream");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

const postSchema = mongoose.Schema({
  image: String,
  likes: String,
  comment: String,
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = {
  User,
  Post,
};
