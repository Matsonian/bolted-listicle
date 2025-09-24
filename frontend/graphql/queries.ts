import { gql } from "graphql-tag";

export const GET_USER = gql`
query User {
  user {
    address1
    address2
    city
    email
    firstName
    id
    isOnboarded
    lastName
    state
  }
}
`;


