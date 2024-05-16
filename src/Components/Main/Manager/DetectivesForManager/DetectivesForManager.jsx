import React, {useEffect, useState} from "react";
import style from "./DetectivesForManager.module.css";
import { useSelector } from 'react-redux';
import Calendar from "../../AllUsers/Calendar/Calendar";
import ReactSlidy from "react-slidy";
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import photo from "../../../../../assets/avatarMan.png";
const Main = () => {
    const DETECTIVE_ROLE = "detective";
    const MANAGER_ROLE = "manager"
    const users = useSelector(state => state.usersPage.users);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(users);

    const detectives = users.filter(user => user.role === DETECTIVE_ROLE);
    console.log(detectives);
    const [showNoSuchDetectives, setShowNoSuchDetectives] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        office: "",
        mail: "",
        name: ""
    });
    const [filteredDetectives, setFilteredDetectives] = useState([]);

    const handleResetFilters = () => {
        setFilterCriteria({
            office: "",
            mail: "",
            name: ""
        });
    };
    useEffect(() => {
        filterDetectives();
    }, [filterCriteria]);
    const filterDetectives = () => {
        let filtered = detectives;

        if (filterCriteria.office) {
            filtered = filtered.filter(detective => detective.office === filterCriteria.office);
        }
        if (filterCriteria.mail) {
            filtered = filtered.filter(detective => detective.mail === filterCriteria.mail);
        }
        if (filterCriteria.name) {
            filtered = filtered.filter(detective => detective.name === filterCriteria.name);
        }
        setFilteredDetectives(filtered);
        setShowNoSuchDetectives(filtered.length === 0);
    };
    return (
        <main className={style.main}>
            <h1 className={style.heading}>Detectives</h1>
            <div className={style.detectivesListWithCalendar}>
                {currentUser && currentUser.role === DETECTIVE_ROLE ? (
                    <div className={style.allProfile}>
                        <h1>My Profile</h1>
                        <div className={style.profile}>
                            <div className={style.detectiveProfileInfo}>
                                <h2 className={style.profileName}>{currentUser.name}</h2>
                                <img src={currentUser.img} alt={currentUser.name} className={style.profileDetectivePhoto} />
                                <p className={style.profileInfo}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Role} target="_blank">Role</a>:</strong> {currentUser.role}</p>
                                <p className={style.profileInfo}><strong>Gender:</strong> {currentUser.gender}</p>
                                <p className={style.profileInfo}><strong>Email:</strong> {currentUser.mail}</p>
                                <p className={style.profileInfo}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Office} target="_blank">Office</a>:</strong> {currentUser.office}</p>
                                <p className={style.profileInfo}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Experience} target="_blank">Experience</a>:</strong> {currentUser.experience}</p>
                            </div>
                            <Calendar calendarLink={currentUser.calendar}/>
                        </div>
                    </div>
                ) : null}

                <form className={style.formForDetectives}>
                    <div className={style.form}>
                        <label htmlFor="filterMail"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by Mail:</label>
                        <input type="text" id="filterMail" value={filterCriteria.mail} onChange={(e) => setFilterCriteria({ ...filterCriteria, mail: e.target.value })} />
                    </div>

                    <div className={style.form}>
                        <label htmlFor="filterOffice"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by <a className={certificateStyle.glosarij} href={links.glosarij_Office} target="_blank">Office</a>:</label>
                        <input type="text" id="filterOffice" value={filterCriteria.office} onChange={(e) => setFilterCriteria({ ...filterCriteria, office: e.target.value })} />
                    </div>

                    <div className={style.form}>
                        <label htmlFor="filterName"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by Name:</label>
                        <input type="text" id="filterName" value={filterCriteria.name} onChange={(e) => setFilterCriteria({ ...filterCriteria, name: e.target.value })} />
                    </div>
                    <button className={style.resetFiltersButton} onClick={handleResetFilters}>Reset Filters</button>
                </form>
                <div className={style.slider}>
                    <ReactSlidy infiniteLoop numOfSlides={currentUser.role === DETECTIVE_ROLE ? 3 : 1} useFullWidth={false} className={style.slider}>
                        {filteredDetectives.map(detective => (
                            <div key={detective.id} className={currentUser.role === DETECTIVE_ROLE ? style.detectiveForDetective : style.detective}>
                                <img src={detective.img} alt={detective.name} className={currentUser.role === DETECTIVE_ROLE  ? style.detectivePhotoForDetective : style.detectivePhotoForManager} />
                                <div className={style.detectiveInfo}>
                                    <h2 className={style.detectiveNameWithCalendar}>{detective.name}</h2>
                                    <p className={style.info}><strong>Email:</strong> {detective.mail}</p>
                                    <p className={style.info}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Office} target="_blank">Office</a>:</strong> {detective.office}</p>
                                    {currentUser && currentUser.role === MANAGER_ROLE ? (
                                        <Calendar calendarLink={detective.calendar}/>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </ReactSlidy>
                </div>
                {showNoSuchDetectives && (
                    <div className={style.noSuchDetectives}>
                        <h1>There are no such <a className={certificateStyle.glosarij} style={{ color: 'red' }} href={links.glosarij_Detective} target="_blank">detectives</a></h1>
                    </div>
                )}
            </div>
            {currentUser && currentUser.role === DETECTIVE_ROLE ? (
                <div className={certificateStyle.certificate}>
                    <a href={links.detectives_detective} target="_blank">About this page</a>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </div>
            ) : <div className={certificateStyle.certificate}>
                <a href={links.detectives_manager} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>}
        </main>
    );
};

export default Main;

