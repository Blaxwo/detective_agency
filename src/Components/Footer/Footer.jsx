import React from "react";
import style from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.footerContent}>
                <p className={style.footerText}>
                    &copy; 2024 Woof Detective Agency. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
