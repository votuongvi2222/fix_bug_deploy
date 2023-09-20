import { GP00 } from "../types/configType";
import axios from "../util/axiosCustomize";

// LIST BANNER
export const getListBanner = () => {
  return axios.get(
    "https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner"
  );
};

// LIST FILM

export const getListFilm = () => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GP00}`
  );
};
