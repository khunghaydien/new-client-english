import { gql } from "@apollo/client"
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        email
        id
        name
        avatar
      }
    }
  }
`

export const LOGOUT_USER = gql`
  mutation Logout {
    logout
  }
`

export const LOGOUT_ALL_DEVICE = gql`
  mutation LogoutAllDevices {
    logoutAllDevices
  }
`

export const REGISTER_USER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
      }
    ) {
      user {
        id
        name
        email
      }
    }
  }
`