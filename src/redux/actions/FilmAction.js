import { getListFilm } from "../../services/MangerFilmServices";
import { GET_LIST_FILM } from "./types/FilmType";
import { DIS_LOADING, LOADING } from "./types/LoadingType";

export const getListFilmAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING,
      });
      const res = await getListFilm();
      if (res && res.content.length > 0) {
        dispatch({
          type: GET_LIST_FILM,
          listFilm: res.content,
        });
      }

      setTimeout(() => {
        dispatch({
          type: DIS_LOADING,
        });
      }, [2000]);
    } catch (error) {
      console.log("err", error);
    }
  };
};
