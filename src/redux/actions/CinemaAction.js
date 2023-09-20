import { getListCinema } from "../../services/ManagerCinemaService";
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
