const UserController = require("../controllers/user.controller");
const PhotoController = require("../controllers/photo.controller");

module.exports = app => {
  app.get("/api/users/", UserController.findAllUsers);
  app.get("/api/users/:id", UserController.findOneSingleUser);
  app.put("/api/users/update/:id", UserController.updateExistingUser);
  app.post("/api/users/new", UserController.createNewUser);
  app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);

  app.get("/api/photos/", PhotoController.findAllPhotos);
  app.get("/api/photos/:id", PhotoController.findOneSinglePhoto);
  app.post("/api/photos/update/:id", PhotoController.updateExistingPhoto);
  app.post("/api/photos/new", PhotoController.createNewPhoto);
  app.delete("/api/photos/delete/:id", PhotoController.deleteAnExistingPhoto);

  app.get("/api/photos/owner/:id",  PhotoController.findAllPhotosByOwnerID );
  app.get("/api/photos/user/:id",  PhotoController.findAllPhotosByUserID );
  app.get("/api/photos/gallery/:id",  PhotoController.findAllPhotosByGalleryID );
};