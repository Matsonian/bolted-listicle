import { gql } from "graphql-tag";


export const UPDATE_USER = gql`
mutation UpdateUser($address1: String, $address2: String, $city: String, $email: String, $firstName: String, $businessDescription: String, $businessName: String, $dailySearchesUsed: Int, $industry: String, $isOnboarded: Boolean, $lastName: String, $productType: String, $state: String, $targetAudience: String, $uniqueValueProposition: String, $website: String, $yearOfFounding: Int) {
  updateUser(address1: $address1, address2: $address2, city: $city, email: $email, firstName: $firstName, businessDescription: $businessDescription, businessName: $businessName, dailySearchesUsed: $dailySearchesUsed, industry: $industry, isOnboarded: $isOnboarded, lastName: $lastName, productType: $productType, state: $state, targetAudience: $targetAudience, uniqueValueProposition: $uniqueValueProposition, website: $website, yearOfFounding: $yearOfFounding) {
    address1
    address2
    businessDescription
    businessName
    city
    dailySearchesUsed
    email
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

export const SIGN_UP_OR_IN_WITH_PASSWORD = gql`
mutation SignUpOrInWithPassword($email: String!, $password: String!) {
  signUpOrInWithPassword(email: $email, password: $password) {
    token
    user {
      address1
    address2
    businessDescription
    businessName
    city
    dailySearchesUsed
    email
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
    userId
  }
}
`;

export const SEND_OTP = gql`
mutation SendOtp($email: String!) {
  sendOtp(email: $email)
}
`;

export const SIGN_IN_WITH_OTP = gql`
mutation SignInWithOtp($otpCode: String!) {
  signInWithOtp(otpCode: $otpCode) {
    token
    user {
      address1
    address2
    businessDescription
    businessName
    city
    dailySearchesUsed
    email
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
    userId
  }
}
`;




export const SEND_OTP_MUTATION = gql`
  mutation SendOtp($email: String!) {
    sendOtp(email: $email)
  }
`;


export const SSO_LOGIN_MUTATION = gql`
  mutation SsoLogin($provider: String!, $accessToken: String!) {
    ssoLogin(provider: $provider, accessToken: $accessToken) {
      token
      userId
    }
  }
`;

export const UPDATE_USER_SUBSCRIPTION = gql`
mutation UpdateUserSubscription($stripeCustomerId: String!, $tier: Tier!, $subscriptionStatus: String) {
  updateUserSubscription(stripeCustomerId: $stripeCustomerId, tier: $tier, subscriptionStatus: $subscriptionStatus) {
    id
    stripeCustomerId
    subscriptionStatus
    tier
  }
}
  `
