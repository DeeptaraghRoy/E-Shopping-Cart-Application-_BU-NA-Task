const allItem = [];
const allItems = (state1 = allItem, action) => {
  switch (action.type) {
    case "ALLITEM":
      return [...state1, action.payload];
      break;

    default:
      return state1;
      break;
  }
};

export default allItems;