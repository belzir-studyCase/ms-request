import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://yacinbnsalh:yacinbnsalh@database.ywuvn.mongodb.net/RequestDB';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
    }
};

export default connectToMongoDB;
