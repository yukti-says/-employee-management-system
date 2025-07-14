const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongodb connected`);
        
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
        
        
    }


}

module.exports = connectDb;