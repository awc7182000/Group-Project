const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
	path: String,
	ratings: [ {
		user_id: String,
		rating: Number
	} ],
	comments: [ {
		user_id: String,
		x: Number,
		y: Number,
		diam: Number,
		comment: String,
	} ]
}, {timestamps: true});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;