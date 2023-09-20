import React from "react";
import { useParams } from "react-router-dom";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";

const Details = () => {
  const { id } = useParams();

  return (
    <div
      style={{
        background: "url(https://picsum.photos/1000)",

        minHeight: "100vh",
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "100vh" }}
        effectColor="#C780FF" // required
        color="#14AEFF" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <h1>Hello</h1>
        <p>This is an example</p>
      </CustomCard>
    </div>
  );
};

export default Details;
