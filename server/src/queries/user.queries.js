import User from "../models/User.model"

export default {
    user: (_, {id}) => User.findById(id),
    users: () => {
        console.log('finding users')
        return User.find()
    },
}