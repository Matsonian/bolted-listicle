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

export const SIGN_IN_MUTATION = gql`
  mutation SignUpOrInWithPassword($email: String!, $password: String!) {
    signUpOrInWithPassword(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $firstName: String
    $lastName: String
    $isOnboarded: Boolean
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      isOnboarded: $isOnboarded
    ) {
      id
      firstName
      lastName
      email
      isOnboarded
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      isOnboarded
    }
  }
`;
