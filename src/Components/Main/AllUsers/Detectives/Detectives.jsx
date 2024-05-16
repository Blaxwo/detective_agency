import React, { useEffect, useState } from "react";
import style from "./Detectives.module.css";
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/styles.css';
import photo from "../../../../assets/avatarMan.png";
import { useSelector } from 'react-redux';
import DetectiveChart from "../DetectiveChart/DetectiveChart";
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const users = useSelector(state => state.usersPage.users);
    const cases = useSelector(state => state.casesPage.cases);
    const [showNoSuchDetectives, setShowNoSuchDetectives] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        experience: "",
        solvedCases: "",
        gender: ""
    });
    const [filteredDetectives, setFilteredDetectives] = useState([]);

    const handleResetFilters = () => {
        setFilterCriteria({
            experience: "",
            solvedCases: "",
            gender: ""
        });
    };

    useEffect(() => {
        filterDetectives();
    }, [filterCriteria]);

    const getDetectiveCasesCount = (detectiveName) => {
        return cases.filter(c => c.detective === detectiveName && c.status === "done").length;
    };

    const detectives = users.filter(user => user.role === "detective").map(detective => ({
        ...detective,
        completedCases: getDetectiveCasesCount(detective.name),
    }));

    const filterDetectives = () => {
        let filtered = detectives;

        // Apply filters
        if (filterCriteria.experience) {
            filtered = filtered.filter(detective => detective.experience === filterCriteria.experience);
        }
        if (filterCriteria.solvedCases) {
            filtered = filtered.filter(detective => detective.completedCases >= parseInt(filterCriteria.solvedCases));
        }
        if (filterCriteria.gender) {
            filtered = filtered.filter(detective => detective.gender === filterCriteria.gender);
        }
        setFilteredDetectives(filtered);
        setShowNoSuchDetectives(filtered.length === 0);
    };

    return (
        <main className={style.main}>
            <div className={style.detectives}>
                <h1 className={style.heading}>Detectives</h1>
                <form className={style.formForDetectives}>
                    <div className={style.form}>
                        <label htmlFor="filterExperience"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by <a className={certificateStyle.glosarij} href={links.glosarij_Experience} target="_blank">Experience</a>:</label>
                        <select id="filterExperience" value={filterCriteria.experience} onChange={(e) => setFilterCriteria({ ...filterCriteria, experience: e.target.value })}>
                            <option value="">All</option>
                            <option value="10 years">10 years</option>
                            <option value="2 years">2 years</option>
                            <option value="5 years">5 years</option>
                        </select>
                    </div>

                    <div className={style.form}>
                        <label htmlFor="filterSolvedCases"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by Solved <a className={certificateStyle.glosarij} href={links.glosarij_Case} target="_blank">Cases</a>:</label>
                        <input type="number" id="filterSolvedCases" value={filterCriteria.solvedCases} onChange={(e) => setFilterCriteria({ ...filterCriteria, solvedCases: e.target.value })} />
                    </div>

                    <div className={style.form}>
                        <label htmlFor="filterGender"><a className={certificateStyle.glosarij} href={links.glosarij_Filtration} target="_blank">Filter</a> by Gender:</label>
                        <select id="filterGender" value={filterCriteria.gender} onChange={(e) => setFilterCriteria({ ...filterCriteria, gender: e.target.value })}>
                            <option value="">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <button className={style.resetFiltersButton} onClick={handleResetFilters}>Reset Filters</button>
                </form>
                <div className={style.slider}>
                    <ReactSlidy infiniteLoop useFullWidth={false} numOfSlides={3}>
                        {filteredDetectives.map(detective => (
                            <div key={detective.id} className={`${style.detective} ${style[detective.experience]}`}>
                                <img src={detective.img || photo} alt={detective.name} className={style.detectivePhoto} />
                                <div className={style.detectiveInfo}>
                                    <h2 className={style.detectiveName}>{detective.name}</h2>
                                    <h2 className={style.info}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Role} target="_blank">Role</a>:</strong> <span><a className={certificateStyle.glosarij} href={links.glosarij_Detective} target="_blank">{detective.role}</a></span></h2>
                                    <h2 className={style.info}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Experience} target="_blank">Experience</a>:</strong> <span>{detective.experience}</span></h2>
                                    <h2 className={style.info}><strong>Completed Cases:</strong> <span>{detective.completedCases}</span></h2>
                                    <h2 className={style.info}><strong>Email:</strong> <span>{detective.mail}</span></h2>
                                    <h2 className={style.info}><strong><a className={certificateStyle.glosarij} href={links.glosarij_Office} target="_blank">Office</a>:</strong> <span>{detective.office}</span></h2>
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
                <DetectiveChart detectives={filteredDetectives} cases={cases} />
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.detectives_client} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
