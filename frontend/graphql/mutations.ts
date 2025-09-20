import { gql } from "graphql-tag";


export const UPDATE_USER = gql`
mutation UpdateUser($address1: String, $address2: String, $church: String, $city: String, $denomination: Denomination, $email: String, $firstName: String, $isOnboarded: Boolean, $lastName: String, $otherDenomination: String, $state: String) {
  updateUser(address1: $address1, address2: $address2, church: $church, city: $city, denomination: $denomination, email: $email, firstName: $firstName, isOnboarded: $isOnboarded, lastName: $lastName, otherDenomination: $otherDenomination, state: $state) {
    address1
    address2
    church
    city
    denomination
    firstName
    isOnboarded
    lastName
    otherDenomination
    state
  }
}
`;

export const GENERATE_SERMON = gql`
mutation GenerateSermon($prompt: String!, $title: String!) {
  generateSermon(prompt: $prompt, title: $title) {
    author {
      id
    }
    id
    title
    pastoralNotes
    sections
    sermonDate
    verses
  }
}
`
