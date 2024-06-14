import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from "../graphql/queries";
import { List, Button, message } from "antd";
import EmployeeEditForm from "./EmployeeEditForm";

const EmployeeList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = async (employee: any) => {
    try {
      await deleteEmployee({ variables: { id: employee.id } });
      message.success("Employee deleted");
      refetch();
    } catch (err) {
      message.error("Error deleting employee");
    }
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setIsEditModalVisible(true);
  };

  const handleModalClose = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Create Employee
      </Button>
      <List
        bordered
        dataSource={data.employees}
        renderItem={(employee: {
          id: string;
          name: string;
          position: string;
        }) => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => handleEdit(employee)}>
                Edit
              </Button>,
              <Button danger onClick={() => handleDelete(employee)}>
                Delete
              </Button>,
            ]}
          >
            {employee.name} - {employee.position}
          </List.Item>
        )}
      />
      <EmployeeEditForm
        visible={isEditModalVisible}
        employee={selectedEmployee}
        refetch={refetch}
        closeModal={handleModalClose}
      />
    </>
  );
};

export default EmployeeList;
