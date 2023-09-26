import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DANG_XUAT } from "../../../../redux/actions/types/AuthType";
import {
  DIS_LOADING,
  LOADING,
} from "../../../../redux/actions/types/LoadingType";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <p>{t("thongTinTk")}</p>,
    },

    {
      key: "2",
      label: (
        <p
          onClick={async () => {
            await dispatch({
              type: DANG_XUAT,
            });

            navigate("/");
          }}
        >
          {t("Dangxuat")}
        </p>
      ),
    },
  ];
  return (
    <div className="profile flex items-center mr-2">
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
