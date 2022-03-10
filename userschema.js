const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    _id: {type: String},
    name: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('User',userschema)