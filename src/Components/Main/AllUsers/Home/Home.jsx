import React from "react";
import style from "./Home.module.css";
import certificateStyle from "../../Main.module.css";
import heroImage from "../../../../assets/detective-agency.jpg";
import detectiveAgency from "../../../../assets/detective-agency.jpg"
import links from '../../../hyperlinksController'
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = (props) => {
    return (
        <main className={style.main}>
            {/* Hero Section */}
            <div className={style.homePage}>
                <section className={style.hero}>
                    <div className={style.heroContent}>
                        <h1 className={style.heroTitle}>Welcome to Detective Agency</h1>
                        <p className={style.heroSubtitle}>Unraveling mysteries, one case at a time.</p>
                        {/*<button className={style.heroButton}>Get Started</button>*/}
                    </div>
                </section>

                {/* Services Section */}
                <section className={style.services}>
                    <h2 className={style.sectionTitle}>Our <a className={certificateStyle.glosarij} style={{color: '#333'}} href={links.glosarij_Services} target="_blank">Services</a></h2>
                    <div className={style.servicesGrid}>
                        <div className={style.service}>
                            <h3>Surveillance</h3>
                            <p>Professional surveillance solutions to gather evidence discreetly.</p>
                        </div>
                        <div className={style.service}>
                            <h3>Background Checks</h3>
                            <p>Thorough background investigations to uncover the truth.</p>
                        </div>
                        <div className={style.service}>
                            <h3>Missing Persons</h3>
                            <p>Dedicated efforts to locate missing individuals and reunite families.</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className={style.testimonials}>
                    <h2 className={style.sectionTitle}>Testimonials</h2>
                    <div className={style.testimonial}>
                        <p>"I couldn't have asked for a better outcome. The team at Detective Agency exceeded my expectations."</p>
                        <p className={style.testimonialAuthor}>- John Doe</p>
                    </div>
                    <div className={style.testimonial}>
                        <p>"Highly recommended! They handled my case with professionalism and sensitivity."</p>
                        <p className={style.testimonialAuthor}>- Jane Smith</p>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className={style.contact}>
                    <section className={style.contact}>
                        <h2 className={style.sectionTitle}><a className={certificateStyle.glosarij} style={{color: '#333'}} href={links.glosarij_Forma_ContactUs} target="_blank">Contact Us</a></h2>
                        <form className={style.contactForm}>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <textarea placeholder="Message"></textarea>
                            <input type="text" placeholder="Address" />
                            <button type="submit">Send Message</button>
                        </form>
                        <p className={style.addressInfo}>Visit us at: 123 Main Street, City, Country</p>
                    </section>
                </section>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.home_page} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
