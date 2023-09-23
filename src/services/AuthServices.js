import axios from "../util/axiosCustomize";

export const postRegister = (taiKhoan, matKhau, email, soDt, maNhom, hoTen) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
    {
      taiKhoan,
      matKhau,
      email,
      soDt,
    }
  );
};

export const postLogin = (taiKhoan, matKhau) => {
  return axios.post(
    "https://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
    {
      taiKhoan,
      matKhau,
    }
  );
};
