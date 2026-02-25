import dotenv from "dotenv";
dotenv.config();
import {createAdmin} from "./utils/createAdmin.ts";

console.log("TWILIO SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TWILIO TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "Loaded" : "Missing");

import app from "./app.ts";
import http from "http";
import connectDB from './config/db.ts'

connectDB().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

createAdmin()

const PORT = process.env.PORT || 50001;

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})
