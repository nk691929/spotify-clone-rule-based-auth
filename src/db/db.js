import {connect} from "mongoose";

async function connectDB() {
    try {
        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTS, MONGO_DATABASE } = process.env;

        if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_HOSTS || !MONGO_DATABASE) {
            throw new Error("Missing .env variables. Make sure dotenv is loaded in server.js.");
        }
        const username = encodeURIComponent(process.env.MONGO_USERNAME)
        const password = encodeURIComponent(process.env.MONGO_PASSWORD)

        const mongoUri =
            `mongodb://${username}:${password}@${MONGO_HOSTS}/${MONGO_DATABASE}` +
            `?tls=true&authSource=admin&retryWrites=true&w=majority`;

        await connect(mongoUri);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection error: ", error);
    }
}

export default connectDB