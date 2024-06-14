import React from "react";
import ReactDOM from "react-dom/client";

import { MockedProvider } from "@apollo/client/testing";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

import reportWebVitals from "./reportWebVitals";
import { mocks } from "./mocks/employeeMocks";
import App from "./App";

import "./index.css";
import "antd/dist/reset.css"; // Ant Design styles

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API_URL }),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>

    {/* </ApolloProvider> */}
  </React.StrictMode>
);

reportWebVitals();
