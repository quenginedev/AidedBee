import User from "../models/User.model"

export default {
    createUser: (_, {name, password, email}) => {
        console.log('new User', name, password, email)
        const user = new User({name, password, email})
        return user.save()
    }
}