import React from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDanhSachNguoiDungAction,
  getTimKiemNguoiDungAction,
} from "../../../../../redux/actions/AuthAction";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { USER_CURRENT } from "../../../../../redux/actions/types/AuthType";
import Search from "antd/lib/input/Search";
import { SearchOutlined } from "@ant-design/icons";
const ListUser = () => {
  const { lstUser } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getDanhSachNguoiDungAction());
  }, []);
  const columns = [
    {
      title: "User",
      dataIndex: "taiKhoan",

      sorter: (a, b) => {
        const nameA = a.taiKhoan.toLowerCase();
        const nameB = b.taiKhoan.toLowerCase();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "hoTen",

      sorter: (a, b) => {
        const nameA = a.hoTen.toLowerCase().trim();
        const nameB = b.hoTen.toLowerCase().trim();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        const nameA = a.email.toLowerCase().trim();
        const nameB = b.email.toLowerCase().trim();
        if (nameA - nameB > 0) {
          return -1;
        }
        return 1;
      },
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "soDt",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (value, user, index) => {
        // console.log("value", value);
        // console.log("user", user);
        return (
          <div className="flex" key={index}>
            <button
              onClick={async () => {
                await dispatch({
                  type: USER_CURRENT,
                  userEdit: user,
                });
                await navigate("/admin/editUser");
              }}
              className="btn btn-primary "
            >
              EDIT
            </button>
            <button
              onClick={async () => {
                await dispatch({
                  type: USER_CURRENT,
                  userEdit: user,
                });
                await navigate("/admin/deleteUser");
              }}
              className="btn btn-danger mx-2"
            >
              DELETE
            </button>
          </div>
        );
      },
    },
  ];
  const data = lstUser;

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const onSearch = async (value) => {
    await dispatch(getTimKiemNguoiDungAction(value));
  };
  return (
    <Fragment>
      <div className="text-center mb-2">
        <h1 className="mb-2 font-bold text-2xl text-center">DANH SÁCH USER</h1>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton={<SearchOutlined style={{ color: "red" }} />}
        />
        <Button
          onClick={() => {
            navigate("/admin/addNewUser");
          }}
          className="text-black border-blue-500"
        >
          Add user
        </Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </Fragment>
  );
};
export default ListUser;
