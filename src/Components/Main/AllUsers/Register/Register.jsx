import { useDispatch } from 'react-redux';
import style from "./Register.module.css"
import { addNewClient } from '../../../../Redux/usersReducer';
import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = '/register';
const Register = () => {
    const usersCount = useSelector(state => state.usersPage.users.length);
    const dispatch = useDispatch();
    const userRef = useRef();
    const errRef = useRef();
    const emailRef = useRef();
    const ageRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [age, setAge] = useState('');
    const [validAge, setValidAge] = useState(false);
    const [ageFocus, setAgeFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate  = useNavigate(); // Изменение здесь

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidAge(age >= 18);
    }, [age])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = age >= 18;
        const v4 = PWD_REGEX.test(pwd);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            dispatch(addNewClient({ id: usersCount+1, role: "client", name: user, mail: email, age: age, password: pwd, description: "New user, there is no description now", workplace: "Unknown",paid: "No"}));
            setUser('');
            setEmail('');
            setAge('');
            setPwd('');
            setMatchPwd('');
            const path = "/login";
            navigate(path);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    };
    return (
        <div>
            <div className={style.register}>
                {success ? (
                    <main>
                        <h1>Success!</h1>
                        <p>
                            <a href="#">Sign In</a>
                        </p>
                    </main>
                ) : (
                    <main>
                        <div className={style.mainRegister}>
                            <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                            <h1><a className={certificateStyle.glosarij} style={{ color: 'black' }} href={links.glosarij_Forma_Register} target="_blank">Register</a></h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">
                                    Username:
                                    <FontAwesomeIcon icon={faCheck} className={validName ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? style.hide : style.invalid} />
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                                <label htmlFor="email">
                                    Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? style.hide : style.invalid} />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Please enter a valid email address.
                                </p>

                                <label htmlFor="age">
                                    Age:
                                    <FontAwesomeIcon icon={faCheck} className={validAge ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validAge || !age ? style.hide : style.invalid} />
                                </label>
                                <input
                                    type="number"
                                    id="age"
                                    ref={ageRef}
                                    autoComplete="off"
                                    onChange={(e) => setAge(e.target.value)}
                                    value={age}
                                    required
                                    aria-invalid={validAge ? "false" : "true"}
                                    aria-describedby="agenote"
                                    onFocus={() => setAgeFocus(true)}
                                    onBlur={() => setAgeFocus(false)}
                                />
                                <p id="agenote" className={ageFocus && age && !validAge ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Please enter a valid age (18 or above).
                                </p>

                                <label htmlFor="password">
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? style.hide : style.invalid} />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>


                                <label htmlFor="confirm_pwd">
                                    Confirm Password:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? style.valid : style.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? style.hide : style.invalid} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p>

                                <button className={style.registerButton} disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                            </form>
                            <p>
                                Already registered?<br />
                                <span className={style.line}>
                            <Link to="/login">Sign In</Link>
                        </span>
                            </p>
                        </div>
                    </main>
                )}
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.registration} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </div>
    )
};
export default Register;