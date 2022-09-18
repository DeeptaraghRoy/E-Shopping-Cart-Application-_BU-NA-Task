export const addItem = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const delItem = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};
export const allItem = (product) => {
  return {
    type: "ALLITEM",
    payload: product,
  };
};
/* export const allProduct = (product) => {
  return {
    type: "ALLPRODUCT",
    payload: product,
  };
}; */


