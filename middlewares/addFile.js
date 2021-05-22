const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "GreenLike-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.split("/")[1] === "jpeg" ||
      file.mimetype.split("/")[1] === "jpg" ||
      file.mimetype.split("/")[1] === "png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("this file is not a photo"));
    }
  },
});

module.exports.send = async (req, res, next) => {
  return await upload.single("image")(req, res, () => {
    console.log(req.file);
    if (req.file === undefined) return next();
    if (!req.file) {
      return res.json({
        message:
          "Invalid image file type ; only accept jpeg, jpg and png (req.file === 'undefined')",
      });
    }
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) return next(err);
      fs.unlinkSync(req.file.path); // ลบไฟล์ในโฟลเดอร์ local storage

      req.imgUrl = result.secure_url;
      next();
    });
  });
};
