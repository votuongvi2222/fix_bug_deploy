import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useState } from "react";
import { Formik, useFormik } from "formik";
import moment from "moment/moment";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddNew = () => {
  const formik = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    onSubmit: (values) => {
      console.log("VALUE", values);
    },
  });

  const handelChangeDatePicker = (value) => {
    console.log("DATE", moment(value).format("DD/MM/YYYY"));
  };
  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="Ma Phim">
          <Input name="maPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ten Phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mo ta">
          <TextArea
            name="moTa"
            rows={4}
            value={formik.values.moTa}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Ngay chieu">
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={() => {
              handelChangeDatePicker();
            }}
          />
        </Form.Item>

        <Form.Item label="Dang chieu">
          <Switch name="dangChieu" style={{ backgroundColor: "green" }} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch name="hot" style={{ backgroundColor: "green" }} />
        </Form.Item>
        <Form.Item label="Sap chieu" valuePropName="checked">
          <Switch name="sapChieu" style={{ backgroundColor: "green" }} />
        </Form.Item>

        <Form.Item label="So sao">
          <InputNumber name="danhGia" />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            type="submit"
          >
            Button
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddNew;
