import { MockedResponse } from "@apollo/client/testing";
import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../graphql/queries";

export const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_EMPLOYEES,
    },
    result: {
      data: {
        employees: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            department: "Engineering",
            address: "123 Main St",
            phoneNumber: "1234567890",
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            department: "Marketing",
            address: "456 Oak Ave",
            phoneNumber: "9876543210",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    },
  },
  {
    request: {
      query: ADD_EMPLOYEE,
      variables: {
        firstName: "New",
        lastName: "Employee",
        department: "Testing",
        address: "789 Pine St",
        phoneNumber: "555-555-5555",
      },
    },
    result: {
      data: {
        addEmployee: {
          id: 3,
          firstName: "New",
          lastName: "Employee",
          department: "Testing",
          address: "789 Pine St",
          phoneNumber: "555-555-5555",
          createdAt: new Date().toISOString(),
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_EMPLOYEE,
      variables: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        department: "Engineering",
        address: "123 Main St",
        phoneNumber: "123-456-7890",
      },
    },
    result: {
      data: {
        updateEmployee: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          department: "Engineering",
          address: "123 Main St",
          phoneNumber: "123-456-7890",
          createdAt: new Date().toISOString(),
        },
      },
    },
  },
  {
    request: {
      query: DELETE_EMPLOYEE,
      variables: { id: 1 },
    },
    result: {
      data: {
        deleteEmployee: { id: 1 },
      },
    },
  },
];
