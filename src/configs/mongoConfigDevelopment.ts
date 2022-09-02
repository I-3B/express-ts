require("dotenv").config();

import { MongoMemoryReplSet } from "mongodb-memory-server-global";
import mongoose from "mongoose";
MongoMemoryReplSet.create().then((mongoServer) => {
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri);

    const db = mongoose.connection;
    db.collection("a").insertOne({ a: "test" });
    mongoose.connection.on("error", (e: { message: { code: string } }) => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(mongoUri);
        }
        console.log(e);
    });
});
