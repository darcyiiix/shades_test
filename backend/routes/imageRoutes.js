// routes/imageRoutes.js
import express from 'express';
import Image from '../models/imageModel.js';

const router = express.Router();

// Route to get all images
router.get('/', async (req, res) => {
    try {
        const images = await Image.find({});
        res.json(images);
        console.log(images)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to get images by type
router.get('/:type', async (req, res) => {
    try {
        const images = await Image.find({ type: req.params.type });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
