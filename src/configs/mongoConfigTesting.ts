import { MongoMemoryReplSet } from "mongodb-memory-server-global";
import mongoose from "mongoose";

const dbConnect = async () => {
    const mongoServer = await MongoMemoryReplSet.create();
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);
    mongoose.connection.on("error", (e: { message: { code: string } }) => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(mongoUri);
        }
        console.log(e);
    });
};
const clearDB = async () => {
    await mongoose.connection.dropDatabase();
};
const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};
export { dbConnect, clearDB, dbDisconnect };
