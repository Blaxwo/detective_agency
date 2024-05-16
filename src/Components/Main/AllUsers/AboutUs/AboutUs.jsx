import React from "react";
import style from "./AboutUs.module.css";
import detectiveAgency from "../../../../assets/detective-agency.jpg"
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    return (
        <main className={style.main}>
            <div className={style.aboutUs}>
                <section className={style.aboutSection}>
                    <div className={style.aboutContent}>
                        <h1 className={style.heading}>About Us</h1>
                        <h2>Professional investigative work</h2>
                        <p className={style.paragraphAboutUs}>
                            Welcome to the world of mystery and intrigue! At Detective Agency X, we specialize in solving the most complex <a className={certificateStyle.glosarij} href={links.glosarij_Case} target="_blank">cases</a> and uncovering the truth hidden beneath layers of deception. With a team of highly skilled <a className={certificateStyle.glosarij} href={links.glosarij_Detective} target="_blank">detectives</a> and cutting-edge technology, we leave no stone unturned in our pursuit of justice.
                        </p>
                        <h2>Intelligence solutions and research</h2>
                        <p className={style.paragraphAboutUs}>
                            Our agency was founded on the principles of integrity, professionalism, and dedication to our <a className={certificateStyle.glosarij} href={links.glosarij_Client} target="_blank">clients</a>. Whether you need assistance with surveillance, background checks, or missing person investigations, we are here to provide you with discreet and reliable <a className={certificateStyle.glosarij} href={links.glosarij_Services} target="_blank">services</a> tailored to your specific needs.
                        </p>
                        <p className={style.paragraphAboutUs}>
                            With years of experience and a track record of successful <a className={certificateStyle.glosarij} href={links.glosarij_Case} target="_blank">cases</a>, Detective Agency X is your trusted partner in uncovering the truth. Contact us today to discuss your <a className={certificateStyle.glosarij} href={links.glosarij_Case} target="_blank">case</a> and let us help you find the answers you seek.
                        </p>
                    </div>
                    <img className={style.aboutImage} src={detectiveAgency} alt="Detective Agency" />
                </section>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.about_us} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
