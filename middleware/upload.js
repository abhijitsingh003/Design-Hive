const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'designhive_uploads',
        resource_type: 'auto', // Important for allowing videos
        format: async (req, file) => {
            const allowedFormats = [
                'jpeg', 'jpg', 'png', 'gif', 'webp',
                'mp4', 'webm', 'mov', 'avi'
            ];
            const ext = file.mimetype.split('/')[1];
            if (allowedFormats.includes(ext)) {
                return ext;
            }
            return 'png'; // default format
        },
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
    },
});

// Check File Type (simplified since Cloudinary handles a lot of this)
function fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|avi|quicktime|x-msvideo/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images and Videos Only!'));
    }
}

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 }, // Increased to 50MB for videos
    fileFilter: fileFilter
});

module.exports = upload;
