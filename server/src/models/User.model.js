import mongoose from 'mongoose'
import userStatic from '../static/user.static'
const bcrypt = require('bcrypt')
const config = require('../config').default
const jwt = require('jsonwebtoken')
import { AuthenticationError } from 'apollo-server-express'

const UserSchema = mongoose.Schema({
    displayName: String,
    photoURL: String,
    phoneNumber: String,
    type: {
        type : String,
        enum: userStatic.account_types,
        default: userStatic.account_types[0]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already in use by another user'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'Password must have min of 6 characters']
    }
})

// Some stuff to do before saving a user like hashing password
UserSchema.pre('save', async function(next){
   let user = this
   if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
   }
   next()
})

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({
        _id: user._id,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        email: user.email
    }, config.jwt_secret)

    return token
}

UserSchema.statics.findByEmailAndPassword = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email})
    if (!user) {
        throw new AuthenticationError('Invalid login credentials, no user')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new AuthenticationError('Invalid login credentials, wrong password')
    }
    user.token = user.generateAuthToken()
    return user
}



const User = mongoose.model('user', UserSchema)
module.exports = User