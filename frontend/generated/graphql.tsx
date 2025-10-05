import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AgentConversation = {
  __typename?: 'AgentConversation';
  AgentConversationMessage?: Maybe<Array<AgentConversationMessage>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type AgentConversationMessage = {
  __typename?: 'AgentConversationMessage';
  content?: Maybe<Scalars['String']['output']>;
  contentJson?: Maybe<Scalars['JSON']['output']>;
  conversation?: Maybe<AgentConversation>;
  conversationId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  metaData?: Maybe<Scalars['JSON']['output']>;
  role?: Maybe<MessageRole>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

/** payload for authenticated user */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type EmailPasswordInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum MessageRole {
  Agent = 'AGENT',
  System = 'SYSTEM',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  sendOtp?: Maybe<Scalars['Boolean']['output']>;
  signInWithOtp?: Maybe<AuthPayload>;
  signUpOrInWithPassword?: Maybe<AuthPayload>;
  ssoLogin?: Maybe<AuthPayload>;
  updateUser?: Maybe<User>;
  updateUserProfile?: Maybe<User>;
  updateUserSubscription?: Maybe<User>;
};


export type MutationSendOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationSignInWithOtpArgs = {
  otpCode: Scalars['String']['input'];
};


export type MutationSignUpOrInWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSsoLoginArgs = {
  accessToken: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  businessDescription?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dailySearchesUsed?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  targetAudience?: InputMaybe<Scalars['String']['input']>;
  uniqueValueProposition?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  yearOfFounding?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateUserProfileArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserSubscriptionArgs = {
  stripeCustomerId: Scalars['String']['input'];
  subscriptionStatus?: InputMaybe<Scalars['String']['input']>;
  tier: Tier;
};

export type OneTimePassword = {
  __typename?: 'OneTimePassword';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  used?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export enum Tier {
  Free = 'FREE',
  Paid = 'PAID'
}

export type User = {
  __typename?: 'User';
  Conversations?: Maybe<Array<AgentConversation>>;
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  businessDescription?: Maybe<Scalars['String']['output']>;
  businessName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  dailySearchesUsed?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  industry?: Maybe<Scalars['String']['output']>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  productType?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  state?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  subscriptionStatus?: Maybe<Scalars['String']['output']>;
  targetAudience?: Maybe<Scalars['String']['output']>;
  tier?: Maybe<Tier>;
  uniqueValueProposition?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  yearOfFounding?: Maybe<Scalars['Int']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserUpdateInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  businessDescription?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dailySearchesUsed?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  yearOfFounding?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserMutationVariables = Exact<{
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  businessDescription?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  dailySearchesUsed?: InputMaybe<Scalars['Int']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  productType?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  targetAudience?: InputMaybe<Scalars['String']['input']>;
  uniqueValueProposition?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  yearOfFounding?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', address1?: string | null, address2?: string | null, businessDescription?: string | null, businessName?: string | null, city?: string | null, dailySearchesUsed?: number | null, email?: string | null, id?: string | null, industry?: string | null, isOnboarded?: boolean | null, lastName?: string | null, productType?: string | null, role?: UserRole | null, state?: string | null, targetAudience?: string | null, tier?: Tier | null, uniqueValueProposition?: string | null, website?: string | null, yearOfFounding?: number | null } | null };

export type SignUpOrInWithPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpOrInWithPasswordMutation = { __typename?: 'Mutation', signUpOrInWithPassword?: { __typename?: 'AuthPayload', token?: string | null, userId?: string | null, user?: { __typename?: 'User', address1?: string | null, address2?: string | null, businessDescription?: string | null, businessName?: string | null, city?: string | null, dailySearchesUsed?: number | null, email?: string | null, id?: string | null, industry?: string | null, isOnboarded?: boolean | null, lastName?: string | null, productType?: string | null, role?: UserRole | null, state?: string | null, targetAudience?: string | null, tier?: Tier | null, uniqueValueProposition?: string | null, website?: string | null, yearOfFounding?: number | null } | null } | null };

export type SendOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp?: boolean | null };

export type SignInWithOtpMutationVariables = Exact<{
  otpCode: Scalars['String']['input'];
}>;


export type SignInWithOtpMutation = { __typename?: 'Mutation', signInWithOtp?: { __typename?: 'AuthPayload', token?: string | null, userId?: string | null, user?: { __typename?: 'User', address1?: string | null, address2?: string | null, businessDescription?: string | null, businessName?: string | null, city?: string | null, dailySearchesUsed?: number | null, email?: string | null, id?: string | null, industry?: string | null, isOnboarded?: boolean | null, lastName?: string | null, productType?: string | null, role?: UserRole | null, state?: string | null, targetAudience?: string | null, tier?: Tier | null, uniqueValueProposition?: string | null, website?: string | null, yearOfFounding?: number | null } | null } | null };

export type SsoLoginMutationVariables = Exact<{
  provider: Scalars['String']['input'];
  accessToken: Scalars['String']['input'];
}>;


export type SsoLoginMutation = { __typename?: 'Mutation', ssoLogin?: { __typename?: 'AuthPayload', token?: string | null, userId?: string | null } | null };

export type UpdateUserSubscriptionMutationVariables = Exact<{
  stripeCustomerId: Scalars['String']['input'];
  tier: Tier;
  subscriptionStatus?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserSubscriptionMutation = { __typename?: 'Mutation', updateUserSubscription?: { __typename?: 'User', id?: string | null, stripeCustomerId?: string | null, subscriptionStatus?: string | null, tier?: Tier | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', address1?: string | null, address2?: string | null, businessDescription?: string | null, businessName?: string | null, city?: string | null, createdAt?: any | null, dailySearchesUsed?: number | null, email?: string | null, firstName?: string | null, id?: string | null, industry?: string | null, isOnboarded?: boolean | null, lastName?: string | null, productType?: string | null, role?: UserRole | null, state?: string | null, targetAudience?: string | null, tier?: Tier | null, uniqueValueProposition?: string | null, website?: string | null, yearOfFounding?: number | null } | null };


export const UpdateUserDocument = gql`
    mutation UpdateUser($address1: String, $address2: String, $city: String, $email: String, $firstName: String, $businessDescription: String, $businessName: String, $dailySearchesUsed: Int, $industry: String, $isOnboarded: Boolean, $lastName: String, $productType: String, $state: String, $targetAudience: String, $uniqueValueProposition: String, $website: String, $yearOfFounding: Int) {
  updateUser(
    address1: $address1
    address2: $address2
    city: $city
    email: $email
    firstName: $firstName
    businessDescription: $businessDescription
    businessName: $businessName
    dailySearchesUsed: $dailySearchesUsed
    industry: $industry
    isOnboarded: $isOnboarded
    lastName: $lastName
    productType: $productType
    state: $state
    targetAudience: $targetAudience
    uniqueValueProposition: $uniqueValueProposition
    website: $website
    yearOfFounding: $yearOfFounding
  ) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      address1: // value for 'address1'
 *      address2: // value for 'address2'
 *      city: // value for 'city'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      businessDescription: // value for 'businessDescription'
 *      businessName: // value for 'businessName'
 *      dailySearchesUsed: // value for 'dailySearchesUsed'
 *      industry: // value for 'industry'
 *      isOnboarded: // value for 'isOnboarded'
 *      lastName: // value for 'lastName'
 *      productType: // value for 'productType'
 *      state: // value for 'state'
 *      targetAudience: // value for 'targetAudience'
 *      uniqueValueProposition: // value for 'uniqueValueProposition'
 *      website: // value for 'website'
 *      yearOfFounding: // value for 'yearOfFounding'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const SignUpOrInWithPasswordDocument = gql`
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
export type SignUpOrInWithPasswordMutationFn = Apollo.MutationFunction<SignUpOrInWithPasswordMutation, SignUpOrInWithPasswordMutationVariables>;

/**
 * __useSignUpOrInWithPasswordMutation__
 *
 * To run a mutation, you first call `useSignUpOrInWithPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpOrInWithPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpOrInWithPasswordMutation, { data, loading, error }] = useSignUpOrInWithPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpOrInWithPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignUpOrInWithPasswordMutation, SignUpOrInWithPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpOrInWithPasswordMutation, SignUpOrInWithPasswordMutationVariables>(SignUpOrInWithPasswordDocument, options);
      }
export type SignUpOrInWithPasswordMutationHookResult = ReturnType<typeof useSignUpOrInWithPasswordMutation>;
export type SignUpOrInWithPasswordMutationResult = Apollo.MutationResult<SignUpOrInWithPasswordMutation>;
export type SignUpOrInWithPasswordMutationOptions = Apollo.BaseMutationOptions<SignUpOrInWithPasswordMutation, SignUpOrInWithPasswordMutationVariables>;
export const SendOtpDocument = gql`
    mutation SendOtp($email: String!) {
  sendOtp(email: $email)
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const SignInWithOtpDocument = gql`
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
export type SignInWithOtpMutationFn = Apollo.MutationFunction<SignInWithOtpMutation, SignInWithOtpMutationVariables>;

/**
 * __useSignInWithOtpMutation__
 *
 * To run a mutation, you first call `useSignInWithOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInWithOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInWithOtpMutation, { data, loading, error }] = useSignInWithOtpMutation({
 *   variables: {
 *      otpCode: // value for 'otpCode'
 *   },
 * });
 */
export function useSignInWithOtpMutation(baseOptions?: Apollo.MutationHookOptions<SignInWithOtpMutation, SignInWithOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInWithOtpMutation, SignInWithOtpMutationVariables>(SignInWithOtpDocument, options);
      }
export type SignInWithOtpMutationHookResult = ReturnType<typeof useSignInWithOtpMutation>;
export type SignInWithOtpMutationResult = Apollo.MutationResult<SignInWithOtpMutation>;
export type SignInWithOtpMutationOptions = Apollo.BaseMutationOptions<SignInWithOtpMutation, SignInWithOtpMutationVariables>;
export const SsoLoginDocument = gql`
    mutation SsoLogin($provider: String!, $accessToken: String!) {
  ssoLogin(provider: $provider, accessToken: $accessToken) {
    token
    userId
  }
}
    `;
export type SsoLoginMutationFn = Apollo.MutationFunction<SsoLoginMutation, SsoLoginMutationVariables>;

/**
 * __useSsoLoginMutation__
 *
 * To run a mutation, you first call `useSsoLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSsoLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ssoLoginMutation, { data, loading, error }] = useSsoLoginMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useSsoLoginMutation(baseOptions?: Apollo.MutationHookOptions<SsoLoginMutation, SsoLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SsoLoginMutation, SsoLoginMutationVariables>(SsoLoginDocument, options);
      }
export type SsoLoginMutationHookResult = ReturnType<typeof useSsoLoginMutation>;
export type SsoLoginMutationResult = Apollo.MutationResult<SsoLoginMutation>;
export type SsoLoginMutationOptions = Apollo.BaseMutationOptions<SsoLoginMutation, SsoLoginMutationVariables>;
export const UpdateUserSubscriptionDocument = gql`
    mutation UpdateUserSubscription($stripeCustomerId: String!, $tier: Tier!, $subscriptionStatus: String) {
  updateUserSubscription(
    stripeCustomerId: $stripeCustomerId
    tier: $tier
    subscriptionStatus: $subscriptionStatus
  ) {
    id
    stripeCustomerId
    subscriptionStatus
    tier
  }
}
    `;
export type UpdateUserSubscriptionMutationFn = Apollo.MutationFunction<UpdateUserSubscriptionMutation, UpdateUserSubscriptionMutationVariables>;

/**
 * __useUpdateUserSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpdateUserSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSubscriptionMutation, { data, loading, error }] = useUpdateUserSubscriptionMutation({
 *   variables: {
 *      stripeCustomerId: // value for 'stripeCustomerId'
 *      tier: // value for 'tier'
 *      subscriptionStatus: // value for 'subscriptionStatus'
 *   },
 * });
 */
export function useUpdateUserSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserSubscriptionMutation, UpdateUserSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserSubscriptionMutation, UpdateUserSubscriptionMutationVariables>(UpdateUserSubscriptionDocument, options);
      }
export type UpdateUserSubscriptionMutationHookResult = ReturnType<typeof useUpdateUserSubscriptionMutation>;
export type UpdateUserSubscriptionMutationResult = Apollo.MutationResult<UpdateUserSubscriptionMutation>;
export type UpdateUserSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpdateUserSubscriptionMutation, UpdateUserSubscriptionMutationVariables>;
export const UserDocument = gql`
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;