const multer = require("multer");
const path = require("path");

/** storage configuration */
const storage = multer.diskStorage({
    /** define storage folder */
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../gambar'));
    },
    /** define filename for upload file */
    filename: (req, file, cb) => {
        cb(
            null,
            `menu-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});
const upload = multer({
    /** storage configuration */
    storage: storage,
    /** filter uploaded file */
    fileFilter: (req, file, cb) => {
        /** filter type of file */
        const acceptedMenu = [`image/jpg`, `image/jpeg`, `image/png`];
        if (!acceptedMenu.includes(file.mimetype)) {
            cb(null, false); /** refuse upload */
            return cb(`Jenis file tidak valid (${file.mimetype})`);
        }
        /** filter size of file */
        const fileSize = req.headers[`content-length`];
        const maxSize = 1 * 1024 * 1024; /** max: 1MB */
        if (fileSize > maxSize) {
            cb(null, false); /** refuse upload */
            return cb(`Ukuran file terlalu besar`);
        }
        cb(null, true); /** accept upload */
    },
});
module.exports = upload;
