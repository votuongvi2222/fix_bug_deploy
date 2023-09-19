import axios from "../../util/axiosCustomize";
import { SET_CAROUSEL } from "./types/CarouselType";
export const getBannerAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(
        "https://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachBanner"
      );

      if (res && res.content.length > 0) {
        dispatch({
          type: SET_CAROUSEL,
          arrIMG: res.content,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
