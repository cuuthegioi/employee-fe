import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from "../graphql/queries";
import { Table, Button, message, Modal, Space } from "antd";
import { TEmployee } from "../types";
import EmployeeEditForm from "./EmployeeEditForm";

const EmployeeList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<TEmployee | null>(
    null
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<TEmployee | null>(
    null
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      await deleteEmployee({ variables: { id: employeeToDelete.id } });
      message.success("Employee deleted");
      refetch();
      setIsDeleteModalVisible(false);
    } catch (err) {
      message.error("Error deleting employee");
    }
  };

  const handleEdit = (employee: TEmployee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setSelectedEmployee(null);
    setIsModalVisible(true);
  };

  const handleDeleteConfirm = (employee: TEmployee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setEmployeeToDelete(null);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: TEmployee) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteConfirm(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Create Employee
      </Button>
      <Table columns={columns} dataSource={data?.employees} rowKey="id" />
      <EmployeeEditForm
        open={isModalVisible}
        employee={selectedEmployee}
        refetch={refetch}
        closeModal={handleModalCancel}
      />
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleDeleteModalCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>
    </>
  );
};

export default EmployeeList;
