import { postLogin, postRegister } from "../../services/AuthServices";
import {
  DANG_NHAP_THANH_CONG,
  DANG_NHAP_THAT_BAI,
  LOGIN,
  REGISTER,
} from "./types/AuthType";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const postRegisterAction = (
  taiKhoan,
  matKhau,
  email,
  soDt,
  maNhom,
  hoTen
) => {
  return async (dispatch, getState) => {
    try {
      const res = await postRegister(
        taiKhoan,
        matKhau,
        email,
        soDt,
        maNhom,
        hoTen
      );
      if (res && res.statusCode === 0) {
        console.log(res);
        dispatch({
          type: REGISTER,
          dataUser: {
            taiKhoan,
            matKhau,
            soDt,
            maNhom,
            hoTen,
          },
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
};

// export const postLoginAction = (taiKhoan, matKhau) => {
//   return async (dispatch, getState) => {
//     try {
//       const res = await postLogin(taiKhoan, matKhau);
//       if (res.statusCode === 200) {
//         toast.success("Đăng nhập thành công");

//         dispatch({
//           type: DANG_NHAP_THANH_CONG,
//           userLogin: res.content,
//           login: true,
//         });
//       } else {
//         toast.error(res.content);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
// };
