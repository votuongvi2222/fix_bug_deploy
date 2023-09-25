import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DANG_XUAT } from "../../../../redux/actions/types/AuthType";
import {
  DIS_LOADING,
  LOADING,
} from "../../../../redux/actions/types/LoadingType";

const Profile = () => {
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: <p>Thông tin tài khoản</p>,
    },

    {
      key: "2",
      label: (
        <p
          onClick={() => {
            dispatch({
              type: DANG_XUAT,
            });
          }}
        >
          Đăng Xuất
        </p>
      ),
    },
  ];
  return (
    <div className="profile flex items-center">
      <img
        className="rounded-full"
        style={{ width: 50, height: 50 }}
        src="https://i.pravatar.cc/300"
        alt=""
      />
      <Dropdown
        placement="bottomRight"
        menu={{
          items,
        }}
        arrow={{
          pointAtCenter: true,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default Profile;
