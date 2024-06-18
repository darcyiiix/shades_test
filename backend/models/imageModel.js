import mongoose from 'mongoose';

const imageModel = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['logo', 'carousel'],
    },
    url: {
        type: String,
        required: true,
    },
    altText: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Image = mongoose.model("Image", imageModel);

export default Image;
