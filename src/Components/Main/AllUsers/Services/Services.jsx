import React from "react";
import style from "./Services.module.css"
import img from "../../../../assets/2175188.png"
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    return (
        <main className={style.main}>
            <div >
                <h1 className={style.heading}>Our Services</h1>
                <div className={style.services}>
                    <section className={style.card}>
                        <div className={style.text}>
                            <h2>Surveillance Services</h2>
                            <p>
                                Our surveillance services offer discreet and professional monitoring for various purposes, including:
                            </p>
                            <ul>
                                <li>Investigating infidelity</li>
                                <li>Monitoring employee activities</li>
                                <li>Gathering evidence for legal cases</li>
                            </ul>
                        </div>
                        <img src={img} alt={"img"} className={style.img}/>
                    </section>
                    <section className={style.card}>
                        <div className={style.text}>
                            <h2>Background Checks</h2>
                            <p>
                                We provide comprehensive background checks to ensure peace of mind and security in various situations:
                            </p>
                            <ul>
                                <li>Pre-employment screening</li>
                                <li>Tenant background checks</li>
                                <li>Online dating safety checks</li>
                            </ul>
                        </div>
                        <img src={img} alt={"img"} className={style.img}/>

                    </section>
                    <section className={style.card}>
                        <div className={style.text}>
                            <h2>Missing Persons Investigations</h2>
                            <p>
                                Our dedicated team conducts thorough investigations to locate missing persons, including:
                            </p>
                            <ul>
                                <li>Missing family members</li>
                                <li>Lost friends or relatives</li>
                                <li>Runaway teenagers</li>
                            </ul>
                        </div>
                        <img src={img} alt={"img"} className={style.img}/>

                    </section>
                    <section className={style.card}>
                        <div className={style.text}>
                            <h2>Asset Search</h2>
                            <p>
                                We assist clients in locating and verifying assets for various purposes, such as:
                            </p>
                            <ul>
                                <li>Divorce proceedings</li>
                                <li>Debt collection</li>
                                <li>Business transactions</li>
                            </ul>
                        </div>
                        <img src={img} alt={"img"} className={style.img}/>
                    </section>
                </div>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.services} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    )
}

export default Main;
