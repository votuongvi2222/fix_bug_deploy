import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteXoaNguoiDung } from "../../../../../services/AuthServices";
import { toast } from "react-toastify";

const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userEdit } = useSelector((state) => state.AuthReducer);
  const [taiKhoan, setTaiKhoan] = useState(userEdit?.taiKhoan);
  const handleChange = (e) => {
    setTaiKhoan(e.target.value);
  };
  useEffect(() => {
    setTaiKhoan(userEdit?.taiKhoan);
  }, [userEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(taiKhoan);
    try {
      const res = await deleteXoaNguoiDung(taiKhoan);
      if (res && res.statusCode === 200) {
        await navigate("/admin/listUser");
        await toast.success(res.content);
      } else {
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  return (
    <>
      <div>DeleteUser</div>
      <Form
        layout="horizontal"
        labelCol={6}
        wrapperCol={16}
        style={{ width: "80%", margin: "auto" }}
      >
        <Form.Item label="Tai Khoan">
          <Input value={taiKhoan} onChange={handleChange} />
          <Button onClick={handleSubmit}>Delete</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DeleteUser;
