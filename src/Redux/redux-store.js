import {combineReducers, createStore} from "redux";
import casesReducer from "./casesReducer";
import rolesReducer from "./rolesReducer"
import usersReducer from "./usersReducer"
import commentsReducer from "./commentsReducer";

let reducers = combineReducers({
    rolesPage: rolesReducer,
    usersPage: usersReducer,
    commentsPage: commentsReducer,
    casesPage: casesReducer,
});

let store = createStore(reducers);

export default store;