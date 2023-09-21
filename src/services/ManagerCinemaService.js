import { GP00 } from "../types/configType";
import axios from "../util/axiosCustomize";
export const getListCinema = () => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GP00}`
  );
};

export const getThongTinPhim = (id) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`
  );
};
