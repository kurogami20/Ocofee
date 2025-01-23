import multer from "multer";

// * parametrage de multer
const storage = multer.diskStorage({
  destination:
    "/var/www/html/sigurd/projet MVC/S09-Ocoffee-kurogami20/public/assets/coffees",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

export default upload;
