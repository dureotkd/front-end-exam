import axios from "axios";

import { util_helper } from "../helpers";

// ==================================== 요청 ======================================

const instance = axios.create({
  baseURL: "http://localhost:4000/",
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
      status,
      data: { code, message },
    } = response;

    util_helper.toast({
      type: code,
      message: message,
    });

    return response;
  },

  (
    // 응답 에러
    error
  ) => {
    util_helper.toast({
      type: "error",
      message: "서버에 문제가 생겼어요",
    });

    return Promise.reject(error);
  }
);

// ==================================== 응답 ======================================

export default instance;
