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
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserProfileArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
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

export type User = {
  __typename?: 'User';
  Conversations?: Maybe<Array<AgentConversation>>;
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UserRole>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserUpdateInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserMutationVariables = Exact<{
  isOnboarded?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, isOnboarded?: boolean | null } | null };

export type SignUpOrInWithPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpOrInWithPasswordMutation = { __typename?: 'Mutation', signUpOrInWithPassword?: { __typename?: 'AuthPayload', token?: string | null, userId?: string | null, user?: { __typename?: 'User', id?: string | null, email?: string | null } | null } | null };

export type SendOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp?: boolean | null };

export type SignInWithOtpMutationVariables = Exact<{
  otpCode: Scalars['String']['input'];
}>;


export type SignInWithOtpMutation = { __typename?: 'Mutation', signInWithOtp?: { __typename?: 'AuthPayload', token?: string | null, userId?: string | null, user?: { __typename?: 'User', id?: string | null, email?: string | null } | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', address1?: string | null, address2?: string | null, city?: string | null, email?: string | null, firstName?: string | null, id?: string | null, isOnboarded?: boolean | null, lastName?: string | null, state?: string | null } | null };


export const UpdateUserDocument = gql`
    mutation UpdateUser($isOnboarded: Boolean, $firstName: String, $lastName: String, $address1: String, $address2: String, $city: String, $state: String, $email: String) {
  updateUser(
    isOnboarded: $isOnboarded
    firstName: $firstName
    lastName: $lastName
    address1: $address1
    address2: $address2
    city: $city
    state: $state
    email: $email
  ) {
    id
    firstName
    lastName
    email
    isOnboarded
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
 *      isOnboarded: // value for 'isOnboarded'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      address1: // value for 'address1'
 *      address2: // value for 'address2'
 *      city: // value for 'city'
 *      state: // value for 'state'
 *      email: // value for 'email'
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
      id
      email
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
      id
      email
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
export const UserDocument = gql`
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