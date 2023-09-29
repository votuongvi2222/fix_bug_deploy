import { Tabs } from "antd";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import contentStyle from "./HomeMenu.css.module.css";
const HomeMenu = (props) => {
  const { heThongRapChieu } = props;
  const navigate = useNavigate();
  const daoChuoi = (chuoi) => {
    let mangChuoi = chuoi.split("-");

    let mangChuoiDaNguoc = mangChuoi.reverse();

    let ngayKhoiChieu = mangChuoiDaNguoc.join("-");
    return ngayKhoiChieu;

    // let tachChuoi = ngayKhoiChieu.split("");
    // let daoChuoi = tachChuoi.reverse();
    // return daoChuoi.split("-");
  };
  return (
    <>
      <Tabs
        tabPosition={"left"}
        items={heThongRapChieu?.map((item, key) => {
          const id = String(key + 1);
          // const logo = item.logo;
          return {
            label: (
              <img
                src={item.logo}
                alt="img-ant"
                className="rounded-full"
                width={50}
              />
            ),
            key: id,
            children: (
              <Tabs
                tabPosition={"left"}
                items={item.lstCumRap?.map((item, key) => {
                  const id = String(key + 1);

                  return {
                    label: (
                      <div className="flex justify-center items-center">
                        <img src={item.hinhAnh} alt="img-ant" width={50} />
                        <div className="content-cine text-left ml-2">
                          <div className="tenCumRap">{item.tenCumRap}</div>
                          <div className="text-red-700">Chi tiết</div>
                        </div>
                      </div>
                    ),
                    key: id,
                    children: (
                      <>
                        {item.danhSachPhim && item.danhSachPhim.length > 0 ? (
                          <>
                            {item.danhSachPhim
                              ?.slice(0, 5)
                              .map((phim, index) => {
                                // console.log("HOME MENU", phim);
                                return (
                                  <Fragment key={index}>
                                    <div className="film-content flex mb-2 border-b-2 pb-2 border-gray-600">
                                      <div className="img">
                                        <img
                                          className="object-cover"
                                          style={{
                                            width: "75px",
                                            height: "75px",
                                          }}
                                          src={phim.hinhAnh}
                                          alt={phim.tenPhim}
                                        />
                                      </div>
                                      <div className="ml-2">
                                        <h1 className="text-2xl text-black font-semibold">
                                          {phim.tenPhim}
                                        </h1>
                                        <p className="mb-2">{item.diaChi}</p>

                                        <div className="grid gap-3 grid-cols-5">
                                          {phim.lstLichChieuTheoPhim
                                            ?.slice(0, 10)
                                            .map((lichChieu, index) => {
                                              // console.log(
                                              //   "LICH CHIEU",
                                              //   lichChieu
                                              // );
                                              // console.log(phim);
                                              return (
                                                <NavLink
                                                  to={`/checkout/${lichChieu.maLichChieu}`}
                                                  className={` rounded-lg item-hour ${contentStyle["item-hour"]}`}
                                                  key={index}
                                                >
                                                  <span
                                                    style={{
                                                      fontSize: ".9rem",
                                                    }}
                                                  >
                                                    {" "}
                                                    {moment(
                                                      lichChieu.ngayChieuGioChieu
                                                    ).format("hh:mm A")}
                                                  </span>
                                                </NavLink>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  </Fragment>
                                );
                              })}
                          </>
                        ) : (
                          <div>Hiện không có phim nào...</div>
                        )}
                      </>
                    ),
                  };
                })}
              />
            ),
          };
        })}
      />
    </>
  );
};
export default HomeMenu;
