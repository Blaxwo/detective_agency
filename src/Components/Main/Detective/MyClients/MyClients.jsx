import React, {useState} from "react";
import {getClientCases, updateCasePhase, updateCases} from "../../../../Redux/casesReducer";
import {useDispatch, useSelector} from "react-redux";
import style from './MyClients.module.css'
import {updateUser} from "../../../../Redux/usersReducer";
import fileContent from "../../../../assets/mist.jpg"
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {color} from "chart.js/helpers";

const DetectiveClients = () => {
    const dispatch = useDispatch();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const allCases = useSelector((state) => state.casesPage.cases);
    const allUsers = useSelector((state) => state.usersPage.users);

    const currentDetectiveCases = allCases.filter(
        (caseItem) => caseItem.detective === currentUser.name
    );
    const namesOfDetectiveClients = Array.from(
        new Set(currentDetectiveCases.map((caseItem) => caseItem.client))
    );
    const currentDetectiveClients = allUsers.filter((user) =>
        namesOfDetectiveClients.includes(user.name)
    );

    const [searchInput, setSearchInput] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        age: "",
        workplace: "",
        description: "",
        paid: "",
    });
    const [expandedClientId, setExpandedClientId] = useState(null);
    const [showNewField, setShowNewField] = useState(null);
    const [newFileDescription, setNewFileDescription] = useState("");


    const handleResetFilters = () => {
        setFilterCriteria({
            age: "",
            workplace: "",
            description: "",
            paid: "",
        });
    };

    const handleRowClick = (clientId) => {
        setExpandedClientId(
            expandedClientId === clientId ? null : clientId
        );
    };

    const handleClientInfoEdit = (id, field, value) => {
        dispatch(updateUser(id, { [field]: value }));
    };

    const filteredClients = currentDetectiveClients.filter((user) => {
        const ageMatch = !filterCriteria.age || (user.age && user.age.toString() === filterCriteria.age);
        const workplaceMatch =
            !filterCriteria.workplace ||
            (user.workplace &&
                user.workplace.toLowerCase().includes(filterCriteria.workplace.toLowerCase()));
        const descriptionMatch =
            !filterCriteria.description ||
            (user.description &&
                user.description.toLowerCase().includes(filterCriteria.description.toLowerCase()));
        const paidMatch =
            !filterCriteria.paid ||
            (user.paid && user.paid.toString() === filterCriteria.paid.toString());

        return (
            user.role === "client" &&
            user.name.toLowerCase().includes(searchInput.toLowerCase()) &&
            ageMatch &&
            workplaceMatch &&
            descriptionMatch &&
            paidMatch
        );
    });

    function handleCaseInfoEdit(id, field, value) {
        dispatch(updateCases(id, { [field]: value }));
    }

    const handleNewField = (casId) => {
        setShowNewField(casId);
    };
    const handleHideNewField = (casId) => {
        setShowNewField(null);
    };

    const handleDeleteFile = (caseId, fileId) => {
        const currentCase = allCases.find((c) => c.id === caseId);
        const updatedFiles = currentCase.files.filter((file) => file.fileId !== fileId);
        dispatch(updateCases(caseId, { files: updatedFiles }));
    };
    const sendFilesOnReview = (cas) => {
        dispatch(updateCasePhase(cas.id, "in review"));
    }
    const handleCreateNewFile = (cas) => {
        const caseId = cas.id
        const newFile = {
            fileId: Math.floor(Math.random() * 1000), // Example random fileId
            fileDate: "2024-04-21",
            fileComment: newFileDescription,
            fileContent: fileContent,
        };

        const currentCase = allCases.find((c) => c.id === caseId);
        const updatedFiles = [...currentCase.files, newFile];
        dispatch(updateCases(caseId, { files: updatedFiles }));

        setNewFileDescription("");

        handleHideNewField(caseId)
    };

    return (
        <div className={style.detectivesClients}>
            <h1 className={style.heading}>Detecive's Clients</h1>
            <form className={style.filterForm}>
                <div className={style.leftFilter}>
                    <div className={style.formGroup}>
                        <label htmlFor="filterAge">Age:</label>
                        <input type="text" id="filterAge" value={filterCriteria.age} onChange={(e) => setFilterCriteria({ ...filterCriteria, age: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterWorkplace">Workplace:</label>
                        <input type="text" id="filterWorkplace" value={filterCriteria.workplace} onChange={(e) => setFilterCriteria({ ...filterCriteria, workplace: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterDescription">Description:</label>
                        <input type="text" id="filterDescription" value={filterCriteria.description} onChange={(e) => setFilterCriteria({ ...filterCriteria, description: e.target.value })} />
                    </div>
                    <div className={style.formGroup}>
                        <label htmlFor="filterPaid"><a className={certificateStyle.glosarij} href={links.glosarij_Paid} target="_blank">Paid</a>:</label>
                        <select id="filterPaid" value={filterCriteria.paid} onChange={(e) => setFilterCriteria({ ...filterCriteria, paid: e.target.value })}>
                            <option value="">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button className={style.resetFiltersButton} onClick={handleResetFilters}>Reset Filters</button>
                </div>
                <div className={style.rightSearch}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search clients..."
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
                            <th>Email</th>
                            <th>Age</th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Description_Client} target="_blank">Description</a></th>
                            <th>Workplace</th>
                            <th><a className={certificateStyle.glosarij}style={{ color: 'white' }} href={links.glosarij_Paid} target="_blank">Paid</a></th>
                        </tr>
                        </thead>
                        <tbody className="thead-main">
                        {filteredClients.map((client, index) => (
                            <React.Fragment key={client.id}>
                                <tr  key={client.id} onClick={() => handleRowClick(client.id)} className={expandedClientId === client.id ? style.rowExpanded : ''}
                                >
                                    <td>{index + 1}</td>
                                    <td>{client.name}</td>
                                    <td>
                                        {client.mail}
                                    </td>
                                    <td>
                                        {client.age}
                                    </td>
                                    <td className={style.description}>
                                        <input
                                            type="text"
                                            value={client.description}
                                            onChange={(e) => handleClientInfoEdit(client.id,'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        {client.workplace}
                                    </td>
                                    <td>
                                        {client.paid}
                                    </td>
                                </tr>
                                {expandedClientId === client.id && (
                                    <tr>
                                        <td colSpan="8" className={style.cases}>
                                            {currentDetectiveCases
                                                .filter(cas => cas.client === client.name)
                                                .map((cas, index) => (
                                                    <div className={style.cas} key={index}>
                                                        <hr className={style.hr}/>
                                                        <input
                                                            className={style.nameOfCase}
                                                            type="text"
                                                            value={cas.name}
                                                            onChange={(e) => handleCaseInfoEdit(cas.id,'name', e.target.value)}
                                                        />
                                                        <p> <span>Date: </span> {cas.date}</p>
                                                        <p> <span><a className={certificateStyle.glosarij} style={{ color: '#1c1c8c' }} href={links.glosarij_Status} target="_blank">Status</a>: </span> {cas.status}</p>
                                                        <p> <span><a className={certificateStyle.glosarij} style={{ color: '#1c1c8c' }} href={links.glosarij_Description_Case} target="_blank">Description</a>: </span> </p>
                                                        <textarea
                                                            className={style.descriptionOfCase}
                                                            value={cas.description}
                                                            onChange={(e) => handleCaseInfoEdit(cas.id,'description', e.target.value)}
                                                        />
                                                        <div className={style.files}>
                                                            <p> <span><a className={certificateStyle.glosarij} style={{ color: '#1c1c8c' }} href={links.glosarij_File} target="_blank">Files</a>: </span> </p>
                                                            {cas.files.length > 0 && (
                                                                <table className={style.filesTable}>
                                                                    <thead>
                                                                    <tr>
                                                                        <th>Id</th>
                                                                        <th>Date</th>
                                                                        <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Comments_files} target="_blank">Comment</a></th>
                                                                        <th>File</th>
                                                                        <th>Action</th>
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
                                                                            <td>
                                                                                <button className={style.deleteFile} onClick={() => handleDeleteFile(cas.id, file.fileId)}>
                                                                                    Delete
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                            {cas.files.length === 0 && (
                                                                <tr>
                                                                    <td colSpan="8" className={style.noClients}>
                                                                        No files founded.
                                                                    </td>
                                                                </tr>
                                                            )}
                                                            {showNewField === cas.id && (
                                                                <div className={style.newFile}>
                                                                    <textarea
                                                                        placeholder="File Description"
                                                                        className={style.textareaField}
                                                                        value={newFileDescription}
                                                                        onChange={(e) => setNewFileDescription(e.target.value)}
                                                                    ></textarea>
                                                                    <input type="file" />
                                                                    <p>Date: 2024-04-22</p>
                                                                    <button className={style.addFile} onClick={() => handleCreateNewFile(cas)}>
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <button className={style.plusButton} onClick={() => handleNewField(cas.id)}>
                                                                +
                                                            </button>
                                                            <p> <span><a className={certificateStyle.glosarij} style={{ color: '#1c1c8c' }} href={links.glosarij_Phase} target="_blank">Status of the case:</a> </span>{cas.phase}</p>
                                                            <button className={style.sendUser} onClick={() => sendFilesOnReview(cas)}>
                                                                Send
                                                            </button>
                                                        </div>
                                                        <div className={certificateStyle.tableCertificate}>
                                                            <a href={links.myClients_casesInformationClient} target="_blank">This part</a>
                                                            <FontAwesomeIcon icon={faInfoCircle} />
                                                        </div>
                                                        <hr className={style.hr}/>
                                                    </div>

                                                ))}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        {filteredClients.length === 0 && (
                            <tr>
                                <td colSpan="8" className={style.noClients}>
                                    No <a className={certificateStyle.glosarij} style={{ color: '#777' }} href={links.glosarij_Client} target="_blank">clients</a> found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={certificateStyle.certificate}>
                <a href={links.my_clients} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </div>
    );
};

export default DetectiveClients;
