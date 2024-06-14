import React from "react";

import "./App.css";

import { Layout, Typography } from "antd";

import EmployeeList from "./components/EmployeeList";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <Title style={{ color: "white" }} level={2}>
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
