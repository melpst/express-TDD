const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tempSchema = new Schema({
	text: String
}, { minimize: false })

module.exports = tempSchema