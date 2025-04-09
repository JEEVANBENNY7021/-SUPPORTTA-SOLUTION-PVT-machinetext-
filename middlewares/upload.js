const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/public'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return cb(new Error('Only images are allowed'));
  cb(null, true);
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 } // 1MB
});

module.exports = upload;
