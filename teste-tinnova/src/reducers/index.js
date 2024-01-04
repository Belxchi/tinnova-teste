import { combineReducers } from "redux";
import produtorReducer from "./produtorReducer";
import dashboardReducer from "./dashboardReducer";

export default combineReducers({
  produtor: produtorReducer,
  dashboard: dashboardReducer,
});
