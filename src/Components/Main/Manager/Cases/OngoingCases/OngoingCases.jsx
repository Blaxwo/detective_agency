import React, { useState } from "react";
import style from "../Cases.module.css";
import {useDispatch, useSelector} from 'react-redux';
import {getDetectives} from "../../../../../Redux/usersReducer";
import certificateStyle from "../../../Main.module.css";
import links from "../../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const ONGOING_STATUS = "ongoing"
    const cases = useSelector(state => state.casesPage.cases);
    const ongoingCases = cases.filter((cas)=>cas.status===ONGOING_STATUS)


    const [searchInput, setSearchInput] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        status: "",
        name: "",
        detective: "",
        date: "",
        client: ""
    });
    const [expandedCaseId, setExpandedCaseId] = useState(null);
    const handleResetFilters = () => {
        setFilterCriteria({
            status: "",
            name: "",
            detective: "",
            date: "",
            client: ""
        });
    };

    const filteredCases = ongoingCases.filter(cas => {
        const dateMatch = !filterCriteria.date || (cas.date && cas.date.toLowerCase().includes(filterCriteria.date.toLowerCase()));
        const nameMatch = !filterCriteria.name || (cas.name && cas.name.toLowerCase().includes(filterCriteria.name.toLowerCase()));
        const detectiveMatch = !filterCriteria.detective || cas.detective === filterCriteria.detective;
        const clientMatch = !filterCriteria.client || (cas.client && cas.client.toLowerCase().includes(filterCriteria.client.toLowerCase()));

        return (
            dateMatch &&
            nameMatch &&
            detectiveMatch &&
            clientMatch
        );
    });
    const namesOfDetectives = () =>{
        return getDetectives().map((detective) => detective.name)
    }

    const detectiveOptions = () => {
        return namesOfDetectives().map((detectiveName)=>(
            <option key={detectiveName} value={detectiveName}>{detectiveName}</option>
        ))
    }
    return (
        <main className={style.main}>
            <h1>Ongoing Cases</h1>
            <form className={style.filterForm}>
                <div className={style.leftFilter}>
                    <div className={style.formGroup}>
                        <label htmlFor="filterDetective"><a className={certificateStyle.glosarij}  href={links.glosarij_Detective} target="_blank">Detective</a>:</label>
                        <select  id="filterDetective" value={filterCriteria.detective} onChange={(e) => setFilterCriteria({ ...filterCriteria, detective: e.target.value })}>
                            <option value="">All</option>
                            {detectiveOptions()}
                        </select>
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterName">Title:</label>
                        <input type="text" id="filterName" value={filterCriteria.name} onChange={(e) => setFilterCriteria({ ...filterCriteria, name: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterClient"><a className={certificateStyle.glosarij}  href={links.glosarij_Client} target="_blank">Client</a>:</label>
                        <input type="text" id="filterClient" value={filterCriteria.client} onChange={(e) => setFilterCriteria({ ...filterCriteria, client: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterDate">Date:</label>
                        <input type="text" id="filterDate" value={filterCriteria.date} onChange={(e) => setFilterCriteria({ ...filterCriteria, date: e.target.value })} />
                    </div>
                    <button className={style.resetFiltersButton} onClick={handleResetFilters}>Reset Filters</button>
                </div>
                <div className={style.rightSearch}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search cases..."
                    />
                </div>
            </form>
            <div className="card-body">
                <div className="table-responsive">
                    <table className={`table ${style.customTable}`}>
                        <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Detective} target="_blank">Detective</a></th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Client} target="_blank">Client</a></th>
                            <th>Date</th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Description_Case} target="_blank">Description</a></th>

                        </tr>
                        </thead>
                        <tbody className="thead-main">
                        {filteredCases.map((cas, index) => (
                            <React.Fragment key={cas.id}>
                                <tr  key={cas.id} className={expandedCaseId === cas.id ? style.rowExpanded : ''}
                                >
                                    <td>{index + 1}</td>
                                    <td  className={style.name}>{cas.name}</td>
                                    <td  className={style.detective}>{cas.detective}</td>
                                    <td  className={style.client}>{cas.client}</td>
                                    <td  className={style.date}>{cas.date}</td>
                                    <td  className={style.caseDescription}>{cas.description}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                        {filteredCases.length === 0 && (
                            <tr>
                                <td colSpan="8" className={style.noClients}>
                                    No <a className={certificateStyle.glosarij} style={{ color: '#777' }} href={links.glosarij_Case} target="_blank">cases</a> found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.ongoing_cases} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
