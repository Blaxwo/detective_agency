import React, { useState } from "react";
import style from "./MyCasesClient.module.css"
import {getClientCases, getNewCases, sendRequestForNewCase, updateCasePhase} from "../../../Redux/casesReducer";
import {useDispatch, useSelector} from "react-redux";
import certificateStyle from "../Main.module.css";
import links from "../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const dispatch = useDispatch();
    const IN_REVIEW = "in review";
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log(currentUser)
    const [newCaseName, setNewCaseName] = useState("");
    const [selectedDetective, setSelectedDetective] = useState("");
    const [caseDescription, setCaseDescription] = useState("");
    const clientCases = getClientCases(currentUser);
    console.log(clientCases);
    const [searchInput, setSearchInput] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        status: "",
        detective: "",
        date: "",
        phase: ""
    });
    const [expandedCaseId, setExpandedCaseId] = useState(null);
    const handleResetFilters = () => {
        setFilterCriteria({
            status: "",
            detective: "",
            date: "",
            phase: ""
        });
    };

    const filteredCases = clientCases.filter(cas => {
        const dateMatch = !filterCriteria.date || (cas.date && cas.date.toLowerCase().includes(filterCriteria.date.toLowerCase()));
        const statusMatch = !filterCriteria.status || (cas.status && cas.status.toLowerCase().includes(filterCriteria.status.toLowerCase()));
        const nameMatch = !filterCriteria.name || (cas.name && cas.name.toLowerCase().includes(filterCriteria.name.toLowerCase()));
        const detectiveMatch = !filterCriteria.detective || (cas.detective && cas.detective.toLowerCase().includes(filterCriteria.detective.toLowerCase()));
        const phaseMatch = !filterCriteria.phase || (cas.phase && cas.phase.toLowerCase()===filterCriteria.phase.toLowerCase());

        return (
            dateMatch &&
            cas.name.toLowerCase().includes(searchInput.toLowerCase()) &&
            statusMatch &&
            nameMatch &&
            detectiveMatch &&
            phaseMatch
        );
    });
    const newCase = {
        id: getNewCases().length+1,
        name: newCaseName,
        status: "in review",
        detective: selectedDetective,
        client: currentUser,
        date: "2024-04-21",
        description: caseDescription
    }
    const handleNewCaseSubmit = () => {
        if(newCaseName&&selectedDetective){
            dispatch(sendRequestForNewCase(newCase));
            setNewCaseName("");
            setSelectedDetective("");
            setCaseDescription("");
        } else {
            alert("Please fill in all fields.");
        }
    };
    const handleRowClick = (caseId) => {
        setExpandedCaseId(
            expandedCaseId === caseId ? null : caseId
        );
    };
    const markFilesAsApproved = (cas) => {
        dispatch(updateCasePhase(cas.id, "approved"));
        window.location.reload();
    };
    return (
        <main className={style.main}>
            <div className={style.clientsCases}>
                <div className={style.caseList}>
                    <h2 className={style.heading}>Clients Cases</h2>
                    <form className={style.filterForm}>
                        <div className={style.leftFilter}>
                            <div className={style.formGroup}>
                                <label htmlFor="filterStatus"><a className={certificateStyle.glosarij} href={links.glosarij_Status} target="_blank">Status</a>:</label>
                                <input type="text" id="filterStatus" value={filterCriteria.status} onChange={(e) => setFilterCriteria({ ...filterCriteria, status: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="filterDetective"><a className={certificateStyle.glosarij} href={links.glosarij_Detective} target="_blank">Detective</a>:</label>
                                <input type="text" id="filterDetective" value={filterCriteria.detective} onChange={(e) => setFilterCriteria({ ...filterCriteria, detective: e.target.value })} />
                            </div>
                            <div className={style.formGroup}>
                                <label htmlFor="filterPhase"><a className={certificateStyle.glosarij} href={links.glosarij_Phase} target="_blank">Phase</a>:</label>
                                <select
                                    value={filterCriteria.phase}
                                    onChange={(e) => setFilterCriteria({ ...filterCriteria, phase: e.target.value })}
                                    className={style.inputField}
                                >
                                    <option value="">Select Phase</option>
                                    <option value="done">Done</option>
                                    <option value="in review">In review</option>
                                    <option value="approved">Approved</option>
                                </select>
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
                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Status} target="_blank">Status</a></th>
                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Detective} target="_blank">Detective</a></th>
                                    <th>Date</th>
                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Description_Case} target="_blank">Description</a></th>

                                </tr>
                                </thead>
                                <tbody className="thead-main">
                                {filteredCases.map((cas, index) => (
                                    <React.Fragment key={cas.id}>
                                        <tr onClick={() => handleRowClick(cas.id)} key={cas.id} className={expandedCaseId === cas.id ? style.rowExpanded : ''}>
                                            <td className={style.id}>{index + 1}</td>
                                            <td  className={style.name}>{cas.name}</td>
                                            <td  className={style.status}>{cas.status}</td>
                                            <td  className={style.detective}>{cas.detective}</td>
                                            <td  className={style.date}>{cas.date}</td>
                                            <td  className={style.caseDescription}>{cas.description}</td>
                                        </tr>
                                        {/* Nested table row */}
                                        {expandedCaseId === cas.id && cas.files.length > 0 && (
                                            <tr key={cas.id + '-files'}>
                                                <td colSpan="6">
                                                    <table className={style.filesTable}>
                                                        <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Date</th>
                                                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Comments_files} target="_blank">Comment</a></th>
                                                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_File} target="_blank">File</a></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {cas.files.map((file, index) => (
                                                            <tr key={index}>
                                                                <td>{file.fileId}</td>
                                                                <td>{file.fileDate}</td>
                                                                <td className={style.comment}>{file.fileComment}</td>
                                                                <td>
                                                                    <a href={file.fileContent} target="_blank" rel="noreferrer">{file.fileContent}</a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        {cas.phase===IN_REVIEW && (
                                                            <button className={style.approveButton} onClick={()=>markFilesAsApproved(cas)}>Approve</button>
                                                        )}
                                                        </tbody>
                                                    </table>
                                                    <p><a className={certificateStyle.glosarij}  href={links.glosarij_Phase} target="_blank">Phase of the case: </a>{cas.phase}</p>
                                                </td>
                                            </tr>
                                        )}
                                        {cas.files.length === 0 && (
                                            <tr>
                                                <td colSpan="6" className={style.noClients}>
                                                    No <a className={certificateStyle.glosarij} style={{ color: '#777' }} href={links.glosarij_File} target="_blank">files</a> found.
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                                {filteredCases.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className={style.noClients}>
                                            No <a className={certificateStyle.glosarij} style={{ color: '#777' }}  href={links.glosarij_Case} target="_blank">case</a> found.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div className={style.newCase}>
                    <h2 className={style.heading} onClick={() => window.open(links.glosarij_Forma_AddNewCase, '_blank')}>Add New Case</h2>
                    <input
                        type="text"
                        placeholder="Case Name"
                        value={newCaseName}
                        onChange={(e) => setNewCaseName(e.target.value)}
                        className={style.inputField}
                    />
                    <select
                        value={selectedDetective}
                        onChange={(e) => setSelectedDetective(e.target.value)}
                        className={style.inputField}
                    >
                        <option value="">Select Detective</option>
                        <option value="Suzi">Suzi</option>
                        <option value="Zak">Zak</option>
                        <option value="Luke">Luke</option>
                    </select>
                    <textarea
                        placeholder="Case Description"
                        value={caseDescription}
                        onChange={(e) => setCaseDescription(e.target.value)}
                        className={style.textareaField}
                    ></textarea>
                    <button onClick={handleNewCaseSubmit} className={style.submitButton}>Submit Case</button>
                    {/*<p className={style.infoMessage}>After sending a new case for review, expect a new case to appear on your cases list during the day; if it does not appear after the time has passed, then it has been rejected. Connect us if you think there was a mistake.</p>*/}
                </div>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.my_cases} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};


export default Main;