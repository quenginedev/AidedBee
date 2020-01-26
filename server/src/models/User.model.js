import mongoose from 'mongoose'
import userStatic from '../static/user.static'

const UserSchema = new mongoose.Schema({
    name: String,
    username: {
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
    },
    account_type: {
        type: String,
        enum: userStatic.account_types,
        default : userStatic.account_types[0]
    },
    phoneNumber: String,
})

export default mongoose.model('user', UserSchema)