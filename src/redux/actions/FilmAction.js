import { getListFilm } from "../../services/MangerFilmServices";
import { GET_LIST_FILM } from "./types/FilmType";

export const getListFilmAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getListFilm();
      if (res && res.content.length > 0) {
        dispatch({
          type: GET_LIST_FILM,
          listFilm: res.content,
        });
      }
    } catch (error) {
      console.log("err", error);
    }
  };
};
