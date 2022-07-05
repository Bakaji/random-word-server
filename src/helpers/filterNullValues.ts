const filterNullValues = <T>(obj: T): T => {
  //iterate through keys
  for (let key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};

export { filterNullValues };
