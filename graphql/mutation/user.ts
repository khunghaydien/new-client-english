import { gql } from "@apollo/client"
export const DELETE_USER = gql`
mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
        fullname
    }
}
`;
