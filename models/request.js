import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    },
    stats: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt timestamps
});

const RequestTB = mongoose.model('requests', requestSchema);

export default RequestTB;
