import util_helper from "./util_helper";
import time_helper from "./time_helper";
import cookie_helper from "./cookie_helper";

const empty = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export { util_helper, time_helper, cookie_helper, empty };
