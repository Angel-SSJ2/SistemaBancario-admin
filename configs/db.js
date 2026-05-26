import mongoose from 'mongoose';
import logger from './logger.js';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('MongoDB | Connection successful.');
    } catch (error) {
        logger.error('MongoDB | Connection failed: ', error.message);
        process.exit(1);
    }
};
