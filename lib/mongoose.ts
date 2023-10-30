import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if(!process.env.MONGODB_URL) return console.log("No se encontro MONGODB_URL");
    if(isConnected) return console.log("MongoDB ya se encuentra conectado");

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;
        console.log("Se conecto a MongoDB");
    } catch (error) {
        console.log(error)
    }
}
