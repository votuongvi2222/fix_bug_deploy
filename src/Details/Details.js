import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "./Details.scss";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getThongTinPhimAction } from "../redux/actions/CinemaAction";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment/moment";

import { Spin } from "antd";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { filmDetail } = useSelector((state) => state.ManagerCinema);
  // console.log(filmDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const arrKhongCoLich = [1];
  const arrTab = ["Lịch Chiếu", "Thông Tin", "Đánh Giá"];
  // console.log(filmDetail.danhGia / 2);
  // const daoChuoi = (chuoi) => {
  //   const tachChuoi = chuoi.split("-");
  //   const reverseChuoi = tachChuoi.reverse();
  //   const chuoiDao = reverseChuoi.join("-");
  //   return chuoiDao;
  // };
  // BACK GROUND BEFORE
  useEffect(() => {
    const hiddenDiv = ref.current;
    // console.log(hiddenDiv.style);

    hiddenDiv.style.setProperty(
      "--before-background",
      `url(${filmDetail.hinhAnh})`
    );
  }, [filmDetail]);

  // LOADING

  // LAY THONG TIN PHIM
  useEffect(() => {
    setLoading(true);
    dispatch(getThongTinPhimAction(id));
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  }, []);

  return (
    // <div
    //   style={{
    //     background: "url(https://picsum.photos/1000)",

    //     minHeight: "100vh",
    //   }}
    // >
    //   <CustomCard
    //     style={{ paddingTop: "150px", minHeight: "100vh" }}
    //     effectColor="#C780FF" // required
    //     color="#14AEFF" // default color is white
    //     blur={20} // default blur value is 10px
    //     borderRadius={0} // default border radius value is 10px
    //   >
    //     <div className="Details-film">
    //       <div className="grid grid-cols-12">
    //         <div className="col-span-4 col-start-4">
    //           <div className="grid-cols-2 grid">
    //             <img src="https://picsum.photos/1000" alt="" />

    //             <div className="content-detail ml-2">
    //               <div>Ten</div>
    //               <div>Mo ta</div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </CustomCard>
    // </div>

    <>
      <div className="movie-card">
        <div className="img-movie">
          <a href="/">
            <img src={filmDetail.hinhAnh} alt="cover" className="cover w-32" />
          </a>
          <div className="hero" ref={ref}>
            <div className="details">
              <div className="title1">
                {filmDetail.tenPhim} <span>PG-18</span>
              </div>
              <div className="title2">
                Ngày chiếu :{" "}
                {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
              </div>
              <fieldset className="rating">
                <Rate allowHalf value={filmDetail.danhGia / 2} />
              </fieldset>
              <span className="likes">{filmDetail.maPhim} likes</span>
            </div>{" "}
            {/* end details */}
          </div>{" "}
          {/* end hero */}
          <div className="description">
            <div className="column1">
              <span className="tag">action</span>
              <span className="tag">fantasy</span>
              <span className="tag">adventure</span>
            </div>{" "}
            {/* end column1 */}
            <div className="column2">
              <p>
                {filmDetail?.moTa?.slice(0, 400)}... <a href="#">read more</a>
              </p>

              {/* end avatars */}
            </div>{" "}
            {/* end column2 */}
          </div>{" "}
          {/* end description */}
        </div>{" "}
      </div>

      <Tabs
        tabPosition={"top"}
        centered={true}
        items={arrTab.map((item, i) => {
          const id = String(i + 1);
          let content = "Hiện không có lịch chiếu";
          if (i === 0) {
            content = {
              label: item,
              key: id,
              children: (
                <>
                  {filmDetail.heThongRapChieu?.length > 0 ? (
                    <Tabs
                      style={{ width: "80%", margin: "auto" }}
                      tabPosition={"left"}
                      items={filmDetail.heThongRapChieu?.map((item, index) => {
                        const id = String(index + 1);
                        // console.log("ITEMMMM", item);
                        return {
                          label: (
                            <img
                              src={item.logo}
                              style={{ width: 50, height: 50 }}
                              alt=""
                            />
                          ),
                          key: id,
                          children: (
                            <>
                              {item.cumRapChieu?.map((rap, index) => {
                                // console.log("RAP", rap);
                                return (
                                  <div key={index}>
                                    <div className="lichChieu d-flex flex-row items-center ">
                                      <div className="img mt-3">
                                        <img
                                          style={{
                                            width: "60px",
                                            height: "60px",
                                          }}
                                          src={rap.hinhAnh}
                                          alt=""
                                        />
                                      </div>
                                      <div className="info-rap ml-2 mt-2">
                                        <p className="nameRap text-xl font-semibold">
                                          {rap.tenCumRap}
                                        </p>
                                        <p className="address text-gray-400">
                                          {rap.diaChi}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="gioChieu grid gap-4 grid-cols-4 pt-3">
                                      {rap.lichChieuPhim?.map((lich, index) => {
                                        // console.log(lich);
                                        return (
                                          <div
                                            className="col-span-1"
                                            key={index}
                                          >
                                            <NavLink
                                              className="item-lichChieu"
                                              to={`/checkout/${lich.maLichChieu}`}
                                            >
                                              {moment(
                                                lich.ngayChieuGioChieu
                                              ).format("HH:MM A")}
                                            </NavLink>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          ),
                        };
                      })}
                    />
                  ) : (
                    <div className="font-bold text-2xl text-center">
                      Hiện không có lịch chiếu
                    </div>
                  )}
                </>
              ),
            };
          } else if (i === 1) {
            content = { label: item, key: id, children: <>SSS</> };
          } else {
            content = { label: item, key: id, children: <>SSS</> };
          }
          return content;
        })}
      />
    </>
  );
};

export default Details;
