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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postThemNguoiDungAction } from "../../../../../../redux/actions/AuthAction";
import { GP00 } from "../../../../../../types/configType";
import { postCapNhapThongTinNguoiDung } from "../../../../../../services/AuthServices";
import { toast } from "react-toastify";

const EditUser = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEdit } = useSelector((state) => state.AuthReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userEdit?.taiKhoan,
      matKhau: userEdit?.matKhau,
      email: userEdit?.email,
      soDt: userEdit?.soDt,
      maNhom: userEdit?.maNhom,
      maLoaiNguoiDung: userEdit?.maLoaiNguoiDung,
      hoTen: userEdit?.hoTen,
    },
    onSubmit: async (value, { resetForm }) => {
      // console.log(value);
      try {
        const res = await postCapNhapThongTinNguoiDung(
          value.taiKhoan,
          value.matKhau,
          value.email,
          value.soDt,
          GP00,
          value.maLoaiNguoiDung,
          value.hoTen
        );
        if (res && res.statusCode === 200) {
          await navigate("/admin/listUser");
          await toast.success("Cap nhat thanh cong");
        } else {
          toast.error(res.content);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    },
  });
  return (
    <>
      <h1 className="text-2xl font-bold text-center w-full mb-2">
        UPDATE USER
      </h1>
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
        <Form.Item label="Tai khoan">
          <Input
            name="taiKhoan"
            value={formik.values.taiKhoan}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Tai khoan"
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
          label="So dien thoai"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            name="soDt"
            value={formik.values.soDt}
            onChange={formik.handleChange}
          />
        </Form.Item>

        <Form.Item
          label="LoaiKH"
          rules={[
            {
              required: true,
              message: "Please select gender!",
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

        <Form.Item placeholder="Ho ten" label="Ho Ten">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>
        <Form.Item label="Chuc nang">
          <Button onClick={formik.handleSubmit}>Update user</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default EditUser;
