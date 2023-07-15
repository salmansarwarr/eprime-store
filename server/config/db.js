import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose
            .connect(process.env.CONNECTION_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        console.log('connected to mongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}