const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI)

const connection = mongoose.connection;

connection.on('connected',()=>{
    console.log('Mongo DB connection successful');
})

connection.on('error', (err)=>{
    console.log('Mongo DB connection failed');
})


module.exports = connection;