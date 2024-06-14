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
          { id: "1", name: "John Doe", position: "Developer" },
          { id: "2", name: "Jane Smith", position: "Designer" },
        ],
      },
    },
  },
  {
    request: {
      query: ADD_EMPLOYEE,
      variables: { name: "New Employee", position: "Tester" },
    },
    result: {
      data: {
        addEmployee: { id: "3", name: "New Employee", position: "Tester" },
      },
    },
  },
  {
    request: {
      query: UPDATE_EMPLOYEE,
      variables: { id: "1", name: "John Doe", position: "Senior Developer" },
    },
    result: {
      data: {
        updateEmployee: {
          id: "1",
          name: "John Doe",
          position: "Senior Developer",
        },
      },
    },
  },
  {
    request: {
      query: DELETE_EMPLOYEE,
      variables: { id: "1" },
    },
    result: {
      data: {
        deleteEmployee: { id: "1" },
      },
    },
  },
];
