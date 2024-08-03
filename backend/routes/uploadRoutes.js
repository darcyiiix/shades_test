import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import path from 'path';

const router = express.Router();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret access key
  region: 'nyc3', // Replace with your DigitalOcean region
  
});

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://nyc3.digitaloceanspaces.com'), // Replace with your DigitalOcean Spaces endpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'shades-by-woodpecker', // Replace with your bucket name
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `images/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
  },
});

const uploadMultipleImages = upload.array('images', 10); // 10 is the maximum number of files allowed

router.post('/', (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    const images = req.files.map(file => file.location); // file.location will be the URL of the uploaded file

    res.status(200).send({
      message: 'Images uploaded successfully',
      images: images,
    });
  });
});

export default router;
