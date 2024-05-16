import React from "react";
import style from "./Login.module.css";
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Main = () => {
    const { setAuth } = useAuth();
    const navigate  = useNavigate(); // Изменение здесь

    const userRef = useRef();
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const users = useSelector(state =>state.usersPage.users);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);
    const handleAuthentication = (foundUser) => {
        setAuth({ user, pwd });

        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        setUser('');
        setPwd('');

        const path = `/${foundUser.role}`;
        navigate(path);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user)
            console.log(pwd)
            const foundUser = users.find(u => u.name === user);
            if (foundUser) {
                if (foundUser.password == pwd) {
                    console.log('Пользователь найден и пароль совпадает');
                    handleAuthentication(foundUser);
                } else {
                    console.log('Пароль не совпадает');
                    setErrMsg('Incorrect Password');
                    if (errRef.current) {
                        errRef.current.focus();
                    }
                }
            } else {
                console.log('Пользователь с таким именем не найден');
                setErrMsg('User not found');
                if (errRef.current) {
                    errRef.current.focus();
                }
            }
        } catch (err) {
            console.error('Error:', err);
            setErrMsg('Login Failed');
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };

    return (
        <main>
            <div className={style.page}>
                <section className={style.logInSection}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1><a className={certificateStyle.glosarij} style={{ color: 'black' }} href={links.glosarij_Forma_LogIn} target="_blank">Sign In:</a></h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
                    </p>
                </section>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.login} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
