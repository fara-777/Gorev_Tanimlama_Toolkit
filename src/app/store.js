import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import crudReducer from "./crudSlice";

export default configureStore({
  reducer: { counterReducer, crudReducer },
});
