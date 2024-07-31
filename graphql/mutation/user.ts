import { gql } from "@apollo/client"
export const DELETE_USER = gql`
mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
        name
    }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($id: String!, $avatar: String! ) {
    updateUser(id: $id, avatar: $avatar) {
        id,
        avatar,
        name, 
    }
}
`;
