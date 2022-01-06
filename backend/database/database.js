const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connect;