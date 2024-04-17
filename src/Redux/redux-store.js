import {combineReducers, createStore} from "redux";
//import calendarsReducer from "./calendarsReducer";
// import clientsReducer from "./clientsReducer";
import casesReducer from "./casesReducer";
// import commentsReducer from "./commentsReducer";
// import servicesReducer from "./servicesReducer";
import rolesReducer from "./rolesReducer"
import usersReducer from "./usersReducer"
import commentsReducer from "./commentsReducer";

//state как обьект, параметры состояния, редакс создаст обьект состояния как был state, у него будут свойства и методы, которые мы передадим
let reducers = combineReducers({
    rolesPage: rolesReducer,
    usersPage: usersReducer,
    commentsPage: commentsReducer,
    // calendarsPage: calendarsReducer,
    // clientsPage: clientsReducer,
    casesPage: casesReducer,
    // commentsPage: commentsReducer,
    // servicesPage: servicesReducer,
});

let store = createStore(reducers);

export default store;