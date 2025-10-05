import { gql } from "graphql-tag";

export const GET_USER = gql`
query User {
  user {
    address1
    address2
    businessDescription
    businessName
    city
    createdAt
    dailySearchesUsed
    email
    firstName
    id
    industry
    isOnboarded
    lastName
    productType
    role
    state
    targetAudience
    tier
    uniqueValueProposition
    website
    yearOfFounding
  }
}
`;


