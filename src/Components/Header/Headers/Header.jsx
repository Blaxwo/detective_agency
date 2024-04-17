import React from "react";
import style from "../Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../../assets/logo.png"
import user from "../../../assets/user.png"

const Header = () => {
    return (
        <header className={style.header}>
            <NavLink to="/" className={style.logoAndName}>
                <img src={logo} alt="wolf"/>
                <h1 className={style.companyName}>Woof</h1>
            </NavLink>
            <nav className={style.nav}>
                <NavLink to="about_us">About us</NavLink>
                <NavLink to="services">Services</NavLink>
                <NavLink to="detectives">Detectives</NavLink>
                <NavLink to="comments">Comments</NavLink>
                <NavLink to="login"><img src={user} alt="login" className={style.userIcon}/></NavLink>
            </nav>
        </header>
    )
}

export default Header;