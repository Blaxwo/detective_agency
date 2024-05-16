import React, {useState} from "react";
import style from "../Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../../assets/logo.png"
import user from "../../../assets/user.png"

const HeaderManager = () => {
    const [showCasesMenu, setShowCasesMenu] = useState(false);

    const handleCasesMenuToggle = () => {
        setShowCasesMenu(!showCasesMenu);
    };
    return (
        <header className={style.header}>
            <NavLink to="/manager" className={style.logoAndName}>
                <img src={logo} alt="wolf"/>
                <h1 className={style.companyName}>Woof</h1>
            </NavLink>
            <nav className={style.nav}>

                <NavLink to="about_us">About us</NavLink>
                <NavLink to="services">Services</NavLink>
                <NavLink to="detectives">Detectives</NavLink>
                <NavLink to="comments">Comments</NavLink>
                <NavLink to="all_clients">All clients</NavLink>
                <div className={style.casesWrapper} onMouseEnter={handleCasesMenuToggle} onMouseLeave={handleCasesMenuToggle}>
                    <NavLink to="cases">Cases</NavLink>
                    {showCasesMenu && (
                        <div className={style.casesMenu}>
                            <NavLink to="new_cases">New cases</NavLink>
                            <NavLink to="done_cases">Done cases</NavLink>
                            <NavLink to="canceled_cases">Canceled cases</NavLink>
                            <NavLink to="ongoing_cases">Ongoing cases</NavLink>
                        </div>
                    )}
                </div>
                <NavLink to="login"><img src={user} alt="login" className={style.userIcon}/></NavLink>
            </nav>
        </header>
    )
}

export default HeaderManager;