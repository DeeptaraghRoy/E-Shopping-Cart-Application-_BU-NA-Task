import addItem from "./addItem";
import allItem from "./allItem";
// import allProduct from "./allProduct";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  // addItem,allItem,allProduct
  addItem,allItem
});

export default rootReducers;
