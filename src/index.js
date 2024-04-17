import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import store from "./Redux/redux-store";
import {Provider} from "react-redux";


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <BrowserRouter>
//         <Routes>
//             <Route path="/*" element={<App />} />
//         </Routes>
//     </BrowserRouter>,
//     document.getElementById('root')
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));

// let rerenderDOM = () => {
//     root.render(
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/*" element={<App />} />
//             </Routes>
//         </BrowserRouter>
//     );
// }
// rerenderDOM(store.getState());
// store.subscribe(() => {
//     let state = store.getState();
//     rerenderDOM(state)
// });