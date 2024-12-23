import { combineReducers, createStore } from "redux";
import { likedReducer } from "../features/likedSlice";
import { filterReducer } from "../features/FilterSlice";
import { registerReducer } from "../features/RegisterSlice";
import { submitReducer } from "../features/SubmitSlice";

const store = createStore(combineReducers({
    liked: likedReducer,
    filter: filterReducer,
    register: registerReducer,
    submit: submitReducer
}))

export default store;