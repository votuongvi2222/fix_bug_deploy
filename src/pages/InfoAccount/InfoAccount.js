import { tab } from "@testing-library/user-event/dist/tab";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postThongTinTaiKhoanAction } from "../../redux/actions/AuthAction";
import {
  postCapNhapThongTinNguoiDung,
  putCapNhatThongTinNguoiDung,
} from "../../services/AuthServices";
import { GP00 } from "../../types/configType";
import { toast } from "react-toastify";
import { CAP_NHAT_THANH_CONG } from "../../redux/actions/types/AuthType";

const InfoAccount = () => {
  const [activeClick, setActiveClick] = useState(0);
  const dispatch = useDispatch();
  const { thongTinTaiKhoan } = useSelector((state) => state.AuthReducer);
  //   console.log({ thongTinTaiKhoan });
  const [edit, setEdit] = useState({
    taiKhoan: thongTinTaiKhoan?.taiKhoan,
    matKhau: thongTinTaiKhoan?.matKhau,
    hoTen: thongTinTaiKhoan?.hoTen,
    email: thongTinTaiKhoan?.email,
    loaiNguoiDung:
      thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng"
        ? "KhachHang"
        : "QuanTri",
    soDT: thongTinTaiKhoan?.soDT,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    dispatch(postThongTinTaiKhoanAction());
  }, []);
  useEffect(() => {
    setEdit({
      ...edit,
      taiKhoan: thongTinTaiKhoan?.taiKhoan,
      matKhau: thongTinTaiKhoan?.matKhau,
      hoTen: thongTinTaiKhoan?.hoTen,
      email: thongTinTaiKhoan?.email,
      loaiNguoiDung:
        thongTinTaiKhoan?.loaiNguoiDung === "Khách hàng"
          ? "KhachHang"
          : "QuanTri",
      soDT: thongTinTaiKhoan?.soDT,
    });
  }, [thongTinTaiKhoan]);
  const handleSubmit = async (e) => {
    try {
      const res = await putCapNhatThongTinNguoiDung(
        edit.taiKhoan,
        edit.matKhau,
        edit.email,
        edit.soDT,
        GP00,
        edit.loaiNguoiDung,
        edit.hoTen
      );
      if (res && res.statusCode === 200) {
        await dispatch({
          type: CAP_NHAT_THANH_CONG,
          userUpdate: res.content,
        });
        await toast.success(res.message);
      } else {
        toast.error(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({
      ...edit,
      [name]: value,
    });
  };

  const tabData = [
    {
      label: "THÔNG TIN TÀI KHOẢN",
      content: (
        <div className="">
          <Form
            onFinish={handleSubmit}
            layout="vertical"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 8,
            }}
          >
            <Form.Item label="Loai Nguoi Dung">
              <Input disabled name="loaiNguoiDung" value={edit.loaiNguoiDung} />
            </Form.Item>
            <Form.Item label="Ten tai khoan">
              <Input
                disabled
                name="taiKhoan"
                value={edit.taiKhoan}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Mat khau">
              <Input.Password
                name="matKhau"
                value={edit.matKhau}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Ho va ten">
              <Input name="hoTen" value={edit.hoTen} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="So dien thoai">
              <Input name="soDT" value={edit.soDT} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Email">
              <Input name="email" value={edit.email} onChange={handleChange} />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit">Cap nhat</Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      label: "LỊCH SỬ ĐẶT VÉ",
      content: <div>AAAAA</div>,
    },
  ];
  return (
    <>
      <div className="pt-48 grid grid-cols-12 px-4">
        <div className="col-span-4">
          <div className="img" style={{ width: 150, height: 150 }}>
            <img
              className="rounded-full"
              src="/image/logoMovie.jpg"
              alt=""
              style={{ height: 150, width: 150 }}
            />
          </div>
          <div className="text-2xl font-bold">TEN</div>
          <table className="table-auto border-2 border-green-500 rounded-2xl w-56  ">
            <thead>
              <tr>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bình luận </td>
                <td>0</td>
              </tr>
              <tr>
                <td>Bình luận được yêu thích</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Só lần thanh toán</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Tổng tiền</td>
                <td>0$</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-span-8">
          <ul className="listTab">
            {tabData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`cursor-pointer inline mx-2 text-2xl font-semibold ${
                    index === activeClick
                      ? "text-green-700 border-b-2 border-green-500"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveClick(index);
                    //   console.log(activeClick);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-4">{tabData[activeClick].content}</div>
        </div>
      </div>
    </>
  );
};

export default InfoAccount;
