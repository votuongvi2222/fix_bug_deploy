import { ThongTinPhongVe } from "../../../_core/models/ThongTinPhongVe";
import { GET_LIST_PHONG_VE } from "../../actions/types/TicketType";

const stateDefault = {
  heThongPhongVe: new ThongTinPhongVe(),
};
export const BookingTicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PHONG_VE:
      return { ...state, heThongPhongVe: action.heThongPhongVe };
    default:
      return { ...state };
  }
};
