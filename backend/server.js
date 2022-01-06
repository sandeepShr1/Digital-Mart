const app = require('./app');
const connect = require("./database/database")
const dotenv = require('dotenv');
const { Mongoose } = require('mongoose');


// config
dotenv.config({ path: "backend/config/config.env" })

// connecting database
connect();


app.listen(process.env.PORT, () => {

    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})