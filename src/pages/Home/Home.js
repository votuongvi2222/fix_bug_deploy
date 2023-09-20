import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useDispatch, useSelector } from "react-redux";
import { getListFilmAction } from "../../redux/actions/FilmAction";
import MultipleRows from "../../component/MutipleRow/MutipleRow";

const Home = () => {
  const listFilm = useSelector((state) => state.ManangerFilmReducer.listFilm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListFilmAction());
  }, []);
  return (
    <div className="container">
      <section className="text-gray-600 body-font list-Film">
        <div className="container px-5 py-24 mx-auto">
          <MultipleRows listFilm={listFilm} />
        </div>
      </section>

      <div className="mx-36">
        <HomeMenu />
      </div>
    </div>
  );
};

export default Home;
