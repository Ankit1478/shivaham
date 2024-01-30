const express = require("express");
const app = express();
const { User, Post } = require("./DB");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config.js");
const userMiddleware = require("./middlewares/index.js");

app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  //Create a new Admin
  await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "Admin Created Successfully",
  });
});

app.get("/allpost", async (req, res) => {
  await Post.find({});
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json(token);
  } else {
    res.json({ msg: "Please signup First" });
  }
});

app.post("/posts/:id", userMiddleware, async (req, res) => {
  const image = req.body.image;
  const likes = req.body.likes;
  const comment = req.body.comment;

  await Post.create({
    image: image,
    likes: likes,
    comment: comment,
  });
  res.json({
    message: "Post Created Successfully",
  });
});

app.delete("/delete/:id", userMiddleware, async (req, res) => {
  const postId = req.params.id; //post id as a url delet/65ubu7398n
  const result = await Post.findOneAndDelete({ _id: postId });
  if (result) {
    res.json({ msg: "Post deleted successfully" });
  } else {
    res.status(404).json({ msg: "Post not found" });
  }
});

app.put("/upadte/:id", userMiddleware, async (req, res) => {
  const postId = req.params.id;
  const { image, likes, comment } = req.body;
  const findpost = await Post.findOneAndUpdate({ _id: postId });

  if (findpost) {
    await Post.findOneAndUpdate({
      image: image,
      likes: likes,
      comment: comment,
    });
    res.json({ msg: "Post Update successfully" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
