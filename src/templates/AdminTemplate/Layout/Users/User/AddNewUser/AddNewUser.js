import React, { useState } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { useFormik } from "formik";
import { values } from "lodash";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postThemNguoiDungAction } from "../../../../../../redux/actions/AuthAction";
import { GP00 } from "../../../../../../types/configType";
import { Option } from "antd/lib/mentions";
import { toast } from "react-toastify";

const AddNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    onSubmit: async (value, { resetForm }) => {
      // console.log(value);
      if (
        isEmtyInput(value.taiKhoan) ||
        isEmtyInput(value.matKhau) ||
        isEmtyInput(value.hoTen) ||
        isEmtyInput(value.email) ||
        isEmtyInput(value.soDt) ||
        isEmtyInput(value.maLoaiNguoiDung)
      ) {
        toast.error("Vui long nhap chinh xac thong tin");
        return;
      }
      if (!isValidEmail(value.email)) {
        toast.error("Vui long nhap chinh xac thong tin");
        return;
      }

      await dispatch(
        postThemNguoiDungAction(
          value.taiKhoan,
          value.matKhau,
          value.email,
          value.soDt,
          GP00,
          value.maLoaiNguoiDung,
          value.hoTen
        )
      );

      await resetForm();
    },
  });
  // VALIDATE EMPTY INPUT
  const isEmtyInput = (value) => {
    return value.trim() === "";
  };
  //VALIDATE EMAIL
  const isValidEmail = (email) => {
    // You can implement your email validation logic here
    // For a basic check, you can use a regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  // VALIDATE PHONE
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue={`+${84}`}
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="00">+00</Option>
      </Select>
    </Form.Item>
  );
  return (
    <>
      <div className="text-center text-2xl mb-2 font-bold">Thêm người dùng</div>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}

        style={{
          maxWidth: "80%",
        }}
      >
        <Form.Item
          label="Tài khoản"
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your name account",
              whitespace: true,
            },
          ]}
        >
          <Input
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password
            name="matKhau"
            value={formik.values.matKhau}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid Email",
            },
            {
              required: true,
              message: "Please input your Email",
            },
          ]}
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          name="soDt"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^[0-9]{8,10}$/, // Add this pattern validation for 8 to 10 digits
              message: "Invalid phone number. Please enter 8 to 10 digits.",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          name="maLoaiNguoiDung"
          label="Loại khách hàng"
          rules={[
            {
              required: true,
              message: "Please select user type!",
            },
          ]}
        >
          <Select
            value={formik.values.maLoaiNguoiDung}
            style={{
              width: "80%",
            }}
            onChange={(value) => {
              formik.setFieldValue("maLoaiNguoiDung", value);
            }}
            options={[
              {
                value: "KhachHang",
                label: "KhachHang",
              },
              {
                value: "QuanTri",
                label: "QuanTri",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="hoTen"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
          placeholder="Ho ten"
          label="Họ tên"
        >
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>
        <Form.Item label="Chức năng">
          <Button onClick={formik.handleSubmit}>Thêm</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNewUser;
