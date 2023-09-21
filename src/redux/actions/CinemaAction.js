import {
  getListCinema,
  getThongTinPhim,
} from "../../services/ManagerCinemaService";
import { GET_THONG_TIN_PHIM } from "../../types/configType";
import { GET_LIST_CINEMA } from "./types/CinemaType";

export const getListCinemaActions = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getListCinema();
      if (res && res.content.length > 0) {
        // console.log(res);
        dispatch({
          type: GET_LIST_CINEMA,
          heThongRapChieu: res.content,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getThongTinPhimAction = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await getThongTinPhim(id);
      if (res && res.statusCode === 200) {
        // console.log(res);
        dispatch({
          type: GET_THONG_TIN_PHIM,
          filmDetail: res.content,
        });
      }
    } catch (error) {}
  };
};
