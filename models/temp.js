const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tempSchema = new Schema({
	text: String
}, { strict: false})

module.exports = tempSchema