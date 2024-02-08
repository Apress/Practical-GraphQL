const { gql } = require("apollo-server");

exports.typeDefs = gql`
    type Query {
        courses(filter: CoursesFilter): [Course!]!
        course(id: ID!): Course
        genres: [Genre!]!
        genre(id: ID!): Genre
        numOfCourses: Int
        price: Float
        isTrainer: Boolean
    }

    type Mutation {
        addGenre(input: AddGenreInput!): Genre!
        addCourse(input: AddCourseInput!): Course!
        addReview(input: AddReviewInput!): Review!
        deleteGenre(id: ID!): Boolean!
        deleteCourse(id: ID!): Boolean!
        deleteReview(id: ID!): Boolean!
        updateGenre(id: ID!, input: UpdateGenreInput!): Genre
        updateCourse(id: ID!, input: UpdateCourseInput!): Course
        updateReview(id: ID!, input: UpdateReviewInput!): Review
    }

    input UpdateGenreInput {
        name: String!
    }

    input AddReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        courseId: ID!
    }

    input UpdateReviewInput {
        date: String!
        title: String!
        comment: String!
        rating: Int!
        courseId: ID!
    }

    input AddGenreInput {
        name: String!
    }

    input AddCourseInput{
        name: String!
        description: String!
        price: Float!
        discount: Boolean!
        genreId: ID
    }

    input UpdateCourseInput {
        name: String!
        description: String!
        price: Float!
        discount: Boolean!
        genreId: ID
    }

    input CoursesFilter {
        discount: Boolean
        avgRating: Int
    }

    type Course {
        id: ID!
        name: String!
        description: String!
        price: Float!
        discount: Boolean!
        genre: Genre
        reviews: [Review!]!
    }

    type Genre {
        id: ID!
        name: String!
        courses(filter: CoursesFilter): [Course!]!
    }

    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
    }
`
