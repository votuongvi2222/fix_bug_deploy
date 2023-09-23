import axios from "../util/axiosCustomize";

export const getListPhongVe = (maPV) => {
  return axios.get(
    `https://movieapi.cyberlearn.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maPV}`
  );
};
