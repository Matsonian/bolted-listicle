import { gql } from "graphql-tag";

export const GET_USER = gql`
query User {
  user {
    address1
    address2
    church
    city
    denomination
    email
    firstName
    id
    isOnboarded
    lastName
    otherDenomination
    state
  }
}
`;
