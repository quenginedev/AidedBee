import User from "../models/User.model"

export default {
    createUserByEmailAndPassword: (_, {email, password}) => {
        console.log('new User', password, email)
        const user = new User({password, email})
        return user.save()
    },
    loginByEmail: (_, {email, password}) => {        
        return User.findByEmailAndPassword(email, password)
    },
    loginByPhone: (_, {phoneNumber, pin}) => {
        return User.findOne({phoneNumber, pin})
        
    },
}