import React, { useEffect, useState } from "react";
import style from "../Cases.module.css";
import {
    getNewCases,
    addCase,
    removeFromNewCases,
    addCanceledCase,
    getCases,
    getCanceledCases
} from "../../../../../Redux/casesReducer";
import { useSelector, useDispatch } from 'react-redux';
import {getDetectives} from "../../../../../Redux/usersReducer";
import certificateStyle from "../../../Main.module.css";
import links from "../../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const dispatch = useDispatch();
    const newCases = useSelector((state) => state.casesPage.newCases) || [];
    const [filterCriteria, setFilterCriteria] = useState({
        name: "",
        detective: "",
        date: "",
        client: ""
    });
    const [sortOrder, setSortOrder] = useState("desc"); // default to descending order
    const [expandedCaseId, setExpandedCaseId] = useState(null);

    const handleResetFilters = () => {
        setFilterCriteria({
            name: "",
            detective: "",
            date: "",
            client: ""
        });
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedCases = [...newCases].sort((a, b) => {
        if (sortOrder === "asc") {
            console.log(new Date(a.date)- new Date(b.date))
            return new Date(a.date)- new Date(b.date);
        } else {
            console.log(new Date(b.date)- new Date(a.date))
            return new Date(b.date)- new Date(a.date);
        }
    });

    const filteredCases = sortedCases.filter(cas => {
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

    const handleConfirmNewCase = (newCase) => {
        newCase.id = getCases().length+1
        newCase.files = [];
        newCase.status = "ongoing";
        newCase.phase = "nothing"
        addCase(newCase);
        dispatch(removeFromNewCases(newCase));
    };

    const handleCancelNewCase = (newCase) => {
        newCase.id = getCanceledCases().length+1
        newCase.status = "canceled";
        addCanceledCase(newCase)
        dispatch(removeFromNewCases(newCase));
    };
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
            <h1>New Cases</h1>
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
                        <label htmlFor="filterDate">Date:</label>
                        <input type="text" id="filterDate" value={filterCriteria.date} onChange={(e) => setFilterCriteria({ ...filterCriteria, date: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterClient"><a className={certificateStyle.glosarij}  href={links.glosarij_Client} target="_blank">Client</a>:</label>
                        <input type="text" id="filterClient" value={filterCriteria.client} onChange={(e) => setFilterCriteria({ ...filterCriteria, client: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterName">Name:</label>
                        <input type="text" id="filterName" value={filterCriteria.name} onChange={(e) => setFilterCriteria({ ...filterCriteria, name: e.target.value })} />
                    </div>
                    <button className={style.resetFiltersButton} onClick={handleResetFilters}>Reset Filters</button>
                </div>
                <div className={style.sortOrder}>
                    <label htmlFor="sortOrder"><a className={certificateStyle.glosarij} href={links.glosarij_Sort_Order} target="_blank">Sort Order:</a> </label>
                    <select className={style.sortOrder} id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="desc">Newest to Oldest</option>
                        <option value="asc">Oldest to Newest</option>
                    </select>
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
                            <th>Confirm</th>
                            <th>Cancel</th>
                        </tr>
                        </thead>
                        <tbody className="thead-main">
                        {filteredCases.map((cas, index) => (
                            <tr key={cas.id} className={expandedCaseId === cas.id ? style.rowExpanded : ''}>
                                <td>{index + 1}</td>
                                <td className={style.name}>{cas.name}</td>
                                <td className={style.detective}>{cas.detective}</td>
                                <td className={style.client}>{cas.client}</td>
                                <td className={style.date}>{cas.date}</td>
                                <td className={style.caseDescription}>{cas.description}</td>
                                <td className={style.confirmButton}>
                                    <button className={style.button} value={"Confirm"} onClick={() => handleConfirmNewCase(cas)}>Confirm</button>
                                </td>
                                <td className={style.cancelButton}>
                                    <button className={style.button} value={"Cancel"} onClick={() => handleCancelNewCase(cas)}>Cancel</button>
                                </td>
                            </tr>
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
                <a href={links.new_cases} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
