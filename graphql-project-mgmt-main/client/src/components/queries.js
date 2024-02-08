import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

const GET_PROJECTS = gql`
    query getProjects {
        projects {
            id
            name
            status
        }
    }
`;

const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
        id
        name
        description
        status
        client {
            id
            name
            email
            phone
            }
        }
    }
`;


export { GET_CLIENTS, GET_PROJECTS, GET_PROJECT };