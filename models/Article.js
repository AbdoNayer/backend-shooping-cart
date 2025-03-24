const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: String,
	body: String,
	image: String,
	disc: String,
	likes: Number,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
