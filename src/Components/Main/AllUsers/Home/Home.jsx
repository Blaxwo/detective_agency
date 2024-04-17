import React from "react";
import style from "./Home.module.css";
import heroImage from "../../../../assets/detective-agency.jpg";
import detectiveAgency from "../../../../assets/detective-agency.jpg"


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
                    <h2 className={style.sectionTitle}>Our Services</h2>
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
                    <h2 className={style.sectionTitle}>Contact Us</h2>
                    <form className={style.contactForm}>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <textarea placeholder="Message"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Main;
