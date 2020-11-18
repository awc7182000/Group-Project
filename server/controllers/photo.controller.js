const Photo = require("../models/photo.model");

module.exports.findAllPhotos = (req, res) => {
  Photo.find()
    .then(allDaPhotos => res.json( allDaPhotos ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSinglePhoto = (req, res) => {
	Photo.findOne({ _id: req.params.id })
		.then(oneSinglePhoto => res.json( oneSinglePhoto ))
		.catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewPhoto = (req, res) => {
  Photo.create(req.body)
    .then(newlyCreatedPhoto => res.json( newlyCreatedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.updateExistingPhoto = (req, res) => {
  Photo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedPhoto => res.json( updatedPhoto ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingPhoto = (req, res) => {
  Photo.deleteOne({ _id: req.params.id })
    .then(result => res.json(result ))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};
