import axios from "axios";

import { time_helper, util_helper } from "../helpers";

// ==================================== 요청 ======================================
export const baseURL =
  window.location.host.indexOf("localhost") !== -1
    ? "http://localhost:4000"
    : "http://211.238.133.10:8090";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 3000,
  withCredentials: true,
  maxRedirects: 0,
});
// 요청 인터셉션
instance.interceptors.request.use(
  async (
    // 요청 보내기 전  수행로직
    config
  ) => {
    return config;
  },

  (
    // 요청 에러 발생시 수행로직
    error
  ) => {
    util_helper.toast({
      type: "error",
      message: "서버에 문제가 생겼어요",
    });
    return Promise.reject(error);
  }
);

// ==================================== 요청 ======================================

// ==================================== 응답 ======================================

// 응답 인터셉션 추
instance.interceptors.response.use(
  async (
    // 응답 로직 생성
    response
  ) => {
    const {
      data: { code, message },
    } = response;

    if (message) {
      util_helper.toast({
        type: code,
        message: message,
      });
    }

    return response;
  },

  async (
    // 응답 에러
    error
  ) => {
    const status = error?.response?.status;

    switch (status) {
      case 401:
        util_helper.toast({
          type: "error",
          message: "로그인 후 이용해주세요",
        });

        await time_helper.wait(3000);
        window.location = "/";

        break;

      default:
        util_helper.toast({
          type: "error",
          message: "서버에 문제가 생겼어요",
        });

        break;
    }

    return Promise.reject(error);
  }
);

// ==================================== 응답 ======================================

export default instance;
