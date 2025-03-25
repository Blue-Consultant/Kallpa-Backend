const fs = require('fs');
const path = require('path');
const multer = require('multer');
const config = require('../configs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = config.images.post;

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
