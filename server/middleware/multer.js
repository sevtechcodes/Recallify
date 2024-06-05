const multer = require('multer');
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, '../uploads');  //This is where multer will store uploaded files
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  }),
  limits: {
		fileSize: 100 * 1024 * 1024 //max 100 MB file size limit
	},

// File filter to allow only certain file types
fileFilter: fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|pdf|mp4|mkv|avi|mp3|wav|aac/; // Allowed file types
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  }
}

	
});

module.exports = upload;
