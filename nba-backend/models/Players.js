const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Player = new Schema ({
    first_name : String,
    last_name : String,
    team : String,
    playerid : Number
})

module.exports = mongoose.model('favorites', Player)