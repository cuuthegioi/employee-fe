import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, message, Form, Input, Modal } from "antd";
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from "../graphql/queries";

interface EmployeeEditFormProps {
  visible: boolean;
  employee: any;
  refetch: () => void;
  closeModal: () => void;
}

const EmployeeEditForm: React.FC<EmployeeEditFormProps> = ({
  visible,
  employee,
  refetch,
  closeModal,
}) => {
  const [addEmployee] = useMutation(ADD_EMPLOYEE);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: employee ? employee.name : "",
      position: employee ? employee.position : "",
    });
  }, [employee, form]);

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (employee) {
        await updateEmployee({ variables: { id: employee.id, ...values } });
        message.success("Employee updated");
      } else {
        await addEmployee({ variables: values });
        message.success("Employee added");
      }
      refetch();
      closeModal();
    } catch (err) {
      message.error("Error saving employee");
    }
  };

  return (
    <Modal
      title={employee ? "Edit Employee" : "Create Employee"}
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={handleSave}
        layout="vertical"
        initialValues={{
          name: employee ? employee.name : "",
          position: employee ? employee.position : "",
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the employee name!" },
          ]}
        >
          <Input placeholder="Enter employee name" />
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          rules={[
            { required: true, message: "Please input the employee position!" },
          ]}
        >
          <Input placeholder="Enter employee position" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeEditForm;
