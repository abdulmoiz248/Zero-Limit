import mongoose from "mongoose";

type Connection = {
    isConnected: boolean;
}

const connection: Connection = {
    isConnected: false
};


export default async function connect(){
    if(connection.isConnected){
        console.log("DB already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        connection.isConnected = true;
        console.log("Connected to DB");
    } catch (error:any) {
        console.log(error.message);
        return;
    }
    
}