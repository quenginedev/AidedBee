import { gql } from "apollo-boost"

export const loginByEmailAndPassword = gql`
  mutation loginByEmailAndPassword($email: String!, $password: String!){
    loginByEmail(email: $email, password: $password){
      email,
      phoneNumber,
      displayName,
      photoUrl,
      id,
      type,
      token
  }
}
`
export const loginByPhoneAndPin = gql`
  mutation loginByPhoneAndPin($phoneNumber: String, $password: String){
    loginByPhone(phoneNumber: $phoneNumber pin: $password){
      email,
      phoneNumber,
      displayName,
      photoUrl,
      id,
      type,
      token
    }
  }
`