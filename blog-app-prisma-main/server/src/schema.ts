import { gql } from "apollo-server";

export const typeDefs = gql`
    type Query {
        me: User
        posts: [Post!]!
        profile(userId: ID!): Profile
    }

    type Mutation{
        postCreate(post: PostInput!): PostPayload!
        postUpdate(postId: ID!, post: PostInput!): PostPayload!
        postDelete(postId: ID!): PostPayload!
        postPublish(postId: ID!): PostPayload!
        postUnPublish(postId: ID!): PostPayload!
        signup(credentials: CredentialsInput , name: String!, bio: String!): AuthPayload!
        signin(credentials: CredentialsInput): AuthPayload!
    }

    input CredentialsInput {
        email: String!
        password: String!
    }

    type AuthPayload {
        userErrors: [UserError!]!
        token: String
    }

    type UserError {
        message: String!
    }

    type PostPayload {
        userErrors: [UserError!]!
        post: Post
    }

    input PostInput {
        title: String
        content: String
    }


    type Post {
        id: ID!
        title: String!
        content: String!
        createdAt: String!
        published: Boolean!
        user: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        profile: Profile!
        posts: [Post!]!
    }

    type Profile {
        id: ID!
        bio: String!
        isMyProfile: Boolean!
        user: User!
    }


`