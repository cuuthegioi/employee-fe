import React from "react";

import "./App.css";

import { Layout, Typography } from "antd";

import EmployeeList from "./components/EmployeeList";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "white", margin: 0 }} level={2}>
          Employee Management
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px", marginTop: "0px" }}>
        <EmployeeList />
      </Content>
    </Layout>
  );
};

export default App;
