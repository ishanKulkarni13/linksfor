import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import connectDB from './database/database.js';

connectDB()

try {
    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}`);
    })
} catch (error) {
    console.log("error while listening:", error);
}