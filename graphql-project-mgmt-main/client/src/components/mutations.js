import { gql } from '@apollo/client';

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!) {
        deleteClient(id: $id) {
            id
            name
            email
            phone
        }
    }
`;

const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`;

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
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

const DELETE_PROJECT = gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
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

export { DELETE_CLIENT, ADD_CLIENT, ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
