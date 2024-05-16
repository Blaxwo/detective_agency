import React from "react";
import style from "./AlreadyAuthorized.module.css";
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
    return (
        <main className={style.main}>
            <div className={style.authMessage}>
                <h2 className={style.authTitle}>Already Registered</h2>
                <p className={style.authText}>You are already registered and authorized to use our services.</p>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.authorised} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
