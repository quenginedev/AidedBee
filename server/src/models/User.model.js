import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: String,
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('user', UserSchema)