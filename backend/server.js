const app = require('./app');
const connect = require("./database/database")
const cloudinary = require('cloudinary');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {

    require("dotenv").config({ path: "backend/config/config.env" })
}

// connecting database
connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const server = app.listen(process.env.PORT, () => {

    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})

// unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection")
    server.close(() => {
        process.exit(1);
    })
});