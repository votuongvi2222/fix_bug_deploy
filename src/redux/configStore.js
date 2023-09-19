import { applyMiddleware } from "redux";
import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducer/CarouselReducer/CarouselReducer";
const rootReducer = combineReducers({
  // State ung dung
  CarouselReducer: CarouselReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
