import { gql } from "graphql-tag";


export const UPDATE_USER = gql`
mutation UpdateUser($isOnboarded: Boolean, $firstName: String, $lastName: String, $address1: String, $address2: String, $city: String, $state: String, $email: String) {
  updateUser(isOnboarded: $isOnboarded, firstName: $firstName, lastName: $lastName, address1: $address1, address2: $address2, city: $city, state: $state, email: $email) {
    id
      firstName
      lastName
      email
      isOnboarded
  }
}
`;

export const SIGN_UP_OR_IN_WITH_PASSWORD = gql`
mutation SignUpOrInWithPassword($email: String!, $password: String!) {
  signUpOrInWithPassword(email: $email, password: $password) {
    token
    user {
      id
      email
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
      id
      email
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
