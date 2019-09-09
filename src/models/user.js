import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	text: String
}, { strict: false})

const userModel = mongoose.model('user',userSchema)

export {userModel}