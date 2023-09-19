import { Carousel } from "antd";
import React from "react";
const contentStyle = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const HomeCarousel = () => (
  <Carousel effect="fade">
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://picsum.photos/1000"
          className="object-cover h-48 w-96"
          alt=""
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://picsum.photos/1000"
          className="object-cover h-48 w-96"
          alt=""
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        {" "}
        <img
          src="https://picsum.photos/100"
          className="object-cover h-48 w-96"
          alt=""
        />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img
          src="https://picsum.photos/1000"
          className="object-cover h-48 w-96"
          alt=""
        />
      </h3>
    </div>
  </Carousel>
);
export default HomeCarousel;
