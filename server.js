const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://abdelwahab:A123123@cluster0.ogm2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("error with connecting with the DB ", error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello in node js project");
});

// ======= ARTICLES ENDPOINTS =====
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const artImage = req.body.articleImage;
  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;
  const artLikes = req.body.articleLikes;
  const artDisc = req.body.articleDisc;

  newArticle.image = artImage;
  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.likes = artLikes;
  newArticle.disc = artDisc;
  await newArticle.save();

  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  console.log("the articles are", articles);

  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findById(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error while reading article of id ", id);
    return res.send("error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error while reading article of id ", id);
    return res.json(error);
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();

  res.render("articles.ejs", {
    allArticles: articles,
  });
});
app.listen(3000, () => {
  console.log(`I am listening in port ${port}`);
});
