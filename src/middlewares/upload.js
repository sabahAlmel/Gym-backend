import multer from "multer";
import path from 'path';
import fs from 'fs';

const uploadDir = 'images';
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage: storage, // Corrected the typo here
    fileFilter: function (req, file, callback) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/svg")
            callback(null, true);
        else {
            console.log('Only jpg & png file supported!');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

export default upload;