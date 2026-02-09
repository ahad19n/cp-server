const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 100
    }
})

exports.handleIncomingFile = upload.single('file');
