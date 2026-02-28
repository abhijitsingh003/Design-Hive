const mongoose = require('mongoose');

// Define a cached variable to hold the connection for serverless
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // If a connection already exists in this server container, reuse it
    if (cached.conn) {
        console.log('Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Recommended for serverless environments
        };

        cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset promise if connection fails
        console.error(`MongoDB Connection Error: ${e.message}`);
        process.exit(1);
    }

    return cached.conn;
};

module.exports = connectDB;
