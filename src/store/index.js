import { createStore, combineReducers } from "redux";
import dashboard from "./reducers/dashboard";

const reducers = combineReducers({
  dashboard,
});

const store = createStore(reducers);

export default store;
