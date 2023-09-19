import { Carousel } from "antd";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannerAction } from "../../../../redux/actions/CarouselAction";
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const HomeCarousel = (prop) => {
  const { arrIMG } = useSelector((state) => state.CarouselReducer);
  const dispatch = useDispatch();
  // console.log(arrIMG);

  useEffect(() => {
    dispatch(getBannerAction());
  }, []);
  return (
    <Carousel effect="fade">
      {arrIMG &&
        arrIMG?.map((item, index) => {
          return (
            <div key={`banner-${index}`}>
              <div
                style={{
                  ...contentStyle,
                  background: `url(${item.hinhAnh})`,
                }}
              >
                <img src={item.hinhAnh} className="w-full opacity-0" alt="" />
              </div>
            </div>
          );
        })}
    </Carousel>
  );
};
export default HomeCarousel;
