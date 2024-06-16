import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      department
      address
      phoneNumber
      createdAt
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $firstName: String!
    $lastName: String!
    $department: String!
    $address: String!
    $phoneNumber: String!
  ) {
    addEmployee(
      firstName: $firstName
      lastName: $lastName
      department: $department
      address: $address
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      department
      address
      phoneNumber
      createdAt
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $department: String!
    $address: String!
    $phoneNumber: String!
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      department: $department
      address: $address
      phoneNumber: $phoneNumber
    ) {
      id
      firstName
      lastName
      department
      address
      phoneNumber
      createdAt
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
