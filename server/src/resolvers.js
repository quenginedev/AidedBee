import User from "./models/User"

export default  {
    Query: {
        user: (_, {id}) => User.findById(id),
        users: () => User.find()
    },
    Mutation: {
        createUser: (_, {name, password, email}) => {
            console.log('new User', name, password, email)
            const user = new User({name, password, email})
            return user.save()
        }
    }
} 