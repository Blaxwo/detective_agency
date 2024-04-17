import React, { useEffect, useState } from "react";
import style from "./Detectives.module.css";
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/styles.css';
import photo from "../../../../assets/avatarMan.png";
import { useSelector } from 'react-redux';
import DetectiveChart from "../DetectiveChart/DetectiveChart";

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
    // const [searchInput, SetSearchInput] = useState("");
    // const FilteredData = () => {
    //     return filteredDetectives.filter(
    //         (user) =>
    //             user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             user.role.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             user.gender.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             user.experience.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             user.office.toLowerCase().includes(searchInput.toLowerCase()) ||
    //             user.mail.toLowerCase().includes(searchInput.toLowerCase())
    //
    //     );
    // };
    const handleResetFilters = () => {
        setFilterCriteria({
            experience: "",
            solvedCases: "",
            gender: ""
        });
    };

    useEffect(() => {
        filterDetectives();
    }, [filterCriteria]); // Re-run when filterCriteria changes

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
        // if (filterCriteria.role) {
        //     filtered = filtered.filter(detective => detective.role === filterCriteria.role);
        // }
        // if (filterCriteria.office) {
        //     filtered = filtered.filter(detective => detective.office === filterCriteria.office);
        // }
        // if (filterCriteria.mail) {
        //     filtered = filtered.filter(detective => detective.mail === filterCriteria.mail);
        // }
        setFilteredDetectives(filtered);
        setShowNoSuchDetectives(filtered.length === 0);
    };

    return (
        <main className={style.main}>
            <h1 className={style.heading}>Detectives</h1>
            <form className={style.formForDetectives}>
                <div className={style.form}>
                    <label htmlFor="filterExperience">Filter by Experience:</label>
                    <select id="filterExperience" value={filterCriteria.experience} onChange={(e) => setFilterCriteria({ ...filterCriteria, experience: e.target.value })}>
                        <option value="">All</option>
                        <option value="10 years">10 years</option>
                        <option value="2 years">2 years</option>
                        <option value="5 years">5 years</option>
                        {/* Add more experience options if needed */}
                    </select>
                </div>

                <div className={style.form}>
                    <label htmlFor="filterSolvedCases">Filter by Solved Cases:</label>
                    <input type="number" id="filterSolvedCases" value={filterCriteria.solvedCases} onChange={(e) => setFilterCriteria({ ...filterCriteria, solvedCases: e.target.value })} />
                </div>

                <div className={style.form}>
                    <label htmlFor="filterGender">Filter by Gender:</label>
                    <select id="filterGender" value={filterCriteria.gender} onChange={(e) => setFilterCriteria({ ...filterCriteria, gender: e.target.value })}>
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        {/* Add more gender options if needed */}
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
                                <h2 className={style.info}><strong>Role:</strong> <span>{detective.role}</span></h2>
                                <h2 className={style.info}><strong>Experience:</strong> <span>{detective.experience}</span></h2>
                                <h2 className={style.info}><strong>Completed Cases:</strong> <span>{detective.completedCases}</span></h2>
                                <h2 className={style.info}><strong>Email:</strong> <span>{detective.mail}</span></h2>
                                <h2 className={style.info}><strong>Office:</strong> <span>{detective.office}</span></h2>
                            </div>
                        </div>
                    ))}
                </ReactSlidy>
            </div>
            {showNoSuchDetectives && (
                <div className={style.noSuchDetectives}>
                    <h1>There are no such detectives</h1>
                </div>
            )}
            <DetectiveChart detectives={filteredDetectives} cases={cases} />
        </main>
    );
};

export default Main;
