import { GET_THONG_TIN_PHIM } from "../../../types/configType";
import { GET_LIST_CINEMA } from "../../actions/types/CinemaType";

const stateDefault = {
  heThongRapChieu: [],
  filmDetail: {},
};

export const ManagerCinema = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_CINEMA: {
      return { ...state, heThongRapChieu: action.heThongRapChieu };
    }
    case GET_THONG_TIN_PHIM: {
      return { ...state, filmDetail: action.filmDetail };
    }
    default:
      return { ...state };
  }
};
