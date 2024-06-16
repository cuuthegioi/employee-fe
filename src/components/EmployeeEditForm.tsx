import React, { useEffect, useState } from "react";

import { Button, message, Form, Input, Modal } from "antd";
import { useMutation } from "@apollo/client";
import { isEqual, omit } from "lodash";

import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from "../graphql/queries";
import { TEmployee } from "../types";

interface EmployeeEditFormProps {
  open: boolean;
  employee: TEmployee | null;
  refetch: () => void;
  closeModal: () => void;
}

const EmployeeEditForm: React.FC<EmployeeEditFormProps> = ({
  open,
  employee,
  refetch,
  closeModal,
}) => {
  const [addEmployee] = useMutation(ADD_EMPLOYEE);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [form] = Form.useForm<TEmployee>();
  const [isValid, setIsValid] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, values]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        firstName: employee ? employee.firstName : "",
        lastName: employee ? employee.lastName : "",
        department: employee ? employee.department : "",
        address: employee ? employee.address : "",
        phoneNumber: employee ? employee.phoneNumber : "",
      });
    }
  }, [open, employee, form]);

  useEffect(() => {
    if (employee) {
      const currentValues = form.getFieldsValue();

      const employeeValues = omit(employee, ["id", "createdAt"]);
      setIsValid(!isEqual(currentValues, employeeValues));
    } else {
      setIsValid(true);
    }
  }, [form, employee]);

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (employee) {
        await updateEmployee({ variables: { ...values } });
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
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSave}
          disabled={!isValid}
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
          firstName: employee ? employee.firstName : "",
          lastName: employee ? employee.lastName : "",
          department: employee ? employee.department : "",
          address: employee ? employee.address : "",
          phoneNumber: employee ? employee.phoneNumber : "",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input the employee's first name!",
            },
          ]}
        >
          <Input placeholder="Enter employee's first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input the employee's last name!",
            },
          ]}
        >
          <Input placeholder="Enter employee's last name" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please input the employee's department!",
            },
          ]}
        >
          <Input placeholder="Enter employee's department" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            { required: true, message: "Please input the employee's address!" },
          ]}
        >
          <Input placeholder="Enter employee's address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input the employee's phone number!",
            },
            {
              pattern: /^\d{10}$/,
              message: "Please input a valid phone number!",
            },
          ]}
        >
          <Input placeholder="Enter employee's phone number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeEditForm;
