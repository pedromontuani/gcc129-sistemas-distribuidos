import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },

})

const middleware = multer({storage: storage});

export default middleware;