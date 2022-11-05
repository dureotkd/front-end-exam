const time_helper = {
  wait: (se) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, se);
    });
  },
};

export default time_helper;
