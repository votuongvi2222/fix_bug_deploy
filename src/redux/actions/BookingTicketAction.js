import { toast } from "react-toastify";
import {
  getListPhongVe,
  postDatVe,
  postThongTinNguoiDung,
} from "../../services/BookingService";
import {
  DAT_VE,
  GET_LIST_PHONG_VE,
  THONG_TIN_DAT_VE,
} from "./types/TicketType";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

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

export const postDatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      const res = await postDatVe(thongTinDatVe);
      console.log(res);
      if (res && res.statusCode === 200) {
        dispatch({
          type: DAT_VE,
          thongTinDatVe: thongTinDatVe,
        });
        toast.success(res.content);
      } else {
        toast.error(res.content);
      }
    } catch (error) {}
  };
};

export const postThongTinNguoiDungAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await postThongTinNguoiDung();
      if (res.statusCode === 200) {
        dispatch({
          type: THONG_TIN_DAT_VE,
          data: res.content,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};
