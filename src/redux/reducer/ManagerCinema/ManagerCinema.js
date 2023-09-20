import { GET_LIST_CINEMA } from "../../actions/types/CinemaType";

const stateDefault = {
  heThongRapChieu: [],
};

export const ManagerCinema = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_CINEMA: {
      return { ...state, heThongRapChieu: action.heThongRapChieu };
    }

    default:
      return { ...state };
  }
};
