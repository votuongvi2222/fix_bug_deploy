import React from "react";
import { Button, Table } from "antd";
import { Input, Space } from "antd";
import { AudioOutlined, SearchOutlined } from "@ant-design/icons";
import styleContent from "./FlimAdmin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { getListFilmAction } from "../../../../redux/actions/FilmAction";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const FilmAdmin = () => {
  const { arrFilmDefault } = useSelector((state) => state.ManangerFilmReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getListFilmAction());
  }, []);
  //   console.log("ARRFILM", arrFilmDefault);
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      //   onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (value, film, index) => {
        return (
          <Fragment key={index}>
            <img
              style={{ width: 50, height: 50 }}
              src={value}
              alt={film.tenPhim}
            />
          </Fragment>
        );
      },
      window: "10%",
    },
    {
      title: "Ten Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend"],
      width: "30%",
    },
    {
      title: "Mo ta",
      dataIndex: "moTa",
      render: (value, film, index) => {
        // console.log("VALUE", value);
        return (
          <Fragment key={index}>
            {value.length > 50 ? value.slice(0, 50) + " ..." : value}
          </Fragment>
        );
      },
      width: "30%",
    },
    {
      title: "Action",
      render: (value, film, index) => {
        // console.log(film);
        return (
          <Fragment key={index}>
            <button
              onClick={() => {
                navigate(`/admin/${film.maPhim}`);
              }}
              className="btn btn-primary mx-2"
            >
              EDIT
            </button>
            <button className="btn btn-danger">DELETE</button>
          </Fragment>
        );
      },
    },
  ];
  const data = arrFilmDefault;
  return (
    <div>
      <h3 className="text-4xl mb-2">Manager Film</h3>
      <Button
        className="border-green-500 mb-2 "
        onClick={() => {
          navigate("/admin/addnew");
        }}
      >
        Add movie
      </Button>

      <Search
        className={styleContent.inputSearch}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton={
          <SearchOutlined style={{ border: "none", color: "red" }} />
        }
      />
      <Table
        className="mt-2"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};
export default FilmAdmin;
