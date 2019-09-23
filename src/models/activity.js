import mongoose from 'mongoose'

const Schema = mongoose.Schema

const activitySchema = new Schema({
    username: String,
    location: {
        coordinates: [Number]
    }
}, { strict: false })

const acitvityModel = mongoose.model('activity',activitySchema)

export {acitvityModel}