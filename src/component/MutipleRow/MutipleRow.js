import React, { Component } from "react";
import Slider from "react-slick";
import styleContent from "./MutipleRow.module.css";
import Films from "../Films/Films";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} ${styleContent["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleContent["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

export default class MultipleRows extends Component {
  renderListFilm = () => {
    return this.props.listFilm.map((item, index) => {
      return (
        <div className={`${styleContent["item-width"]}`} key={index}>
          <Films />
        </div>
      );
    });
  };
  render() {
    const settings = {
      className: "center slider variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div>
        <h2>Multiple Rows</h2>
        <Slider {...settings}>{this.renderListFilm()}</Slider>
      </div>
    );
  }
}
