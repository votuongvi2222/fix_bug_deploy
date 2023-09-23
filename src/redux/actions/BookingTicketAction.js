import { toast } from "react-toastify";
import { getListPhongVe } from "../../services/BookingService";
import { GET_LIST_PHONG_VE } from "./types/TicketType";

export const getListPhongVeAction = (maPhongVe) => {
  return async (dispatch, getState) => {
    try {
      const res = await getListPhongVe(maPhongVe);
      if (res.statusCode === 200 && res) {
        dispatch({
          type: GET_LIST_PHONG_VE,
          heThongPhongVe: res.content,
        });
      } else {
        console.log(res.content);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };
};
