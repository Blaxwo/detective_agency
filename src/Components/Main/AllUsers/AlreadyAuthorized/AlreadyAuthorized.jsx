import React from "react";
import style from "./AlreadyAuthorized.css";

const Main = () => {
    return (
        <main className={style.main}>
            <div className={style.authMessage}>
                <h2 className={style.authTitle}>Already Registered</h2>
                <p className={style.authText}>You are already registered and authorized to use our services.</p>
            </div>
        </main>
    );
};

export default Main;
