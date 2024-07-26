import { gql } from "@apollo/client"
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        email
        id
        fullname
        avatar
      }
    }
  }
`

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout
  }
`

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $fullname: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        fullname: $fullname
        email: $email
        password: $password
      }
    ) {
      user {
        id
        fullname
        email
      }
    }
  }
`