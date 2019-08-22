import mongoose from 'mongoose'

const Schema = mongoose.Schema

let userSchema = new Schema({
	username: String,
	text: String
}, { strict: false})

userSchema = mongoose.model('user',userSchema)

export {userSchema}