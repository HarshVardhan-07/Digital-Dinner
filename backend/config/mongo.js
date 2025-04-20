import mongoose from 'mongoose';

export const connectMongo = async (URI) => {
    try{
        await mongoose.connect(URI);
        console.log('MongoDB connected');
    }catch(err){
        console.error('MongoDB connection error:', err);
    }
};

