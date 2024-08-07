import { gql } from "@apollo/client";
export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      email
      id
      name
      avatar
    }
  }
`;