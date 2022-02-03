const app = require('./app');
const connect = require("./database/database")
const dotenv = require('dotenv');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})



// config
dotenv.config({ path: "backend/config/config.env" })

// connecting database
connect();


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