import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      position
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!) {
    addEmployee(name: $name, position: $position) {
      id
      name
      position
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $name: String!, $position: String!) {
    updateEmployee(id: $id, name: $name, position: $position) {
      id
      name
      position
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;
