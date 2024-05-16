import React, { useState } from "react";
import style from "./AllClients.module.css";
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from "../../../../Redux/usersReducer";
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.usersPage.users);
    const cases = useSelector(state => state.casesPage.cases)
    const [searchInput, setSearchInput] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        age: "",
        workplace: "",
        description: "",
        paid: ""
    });
    const [expandedClientId, setExpandedClientId] = useState(null);
    const [editedClientInfo, setEditedClientInfo] = useState({});
    const handleResetFilters = () => {
        setFilterCriteria({
            age: "",
            workplace: "",
            description: "",
            paid: ""
        });
    };
    const handleRowClick = (clientId) => {
        setExpandedClientId(expandedClientId === clientId ? null : clientId);
    };
    const handleClientInfoEdit = (id, field, value) => {
        console.log("asd")
        dispatch(updateUser(id, { [field]: value }));
        // console.log(editedClientInfo)
    };
    const filteredClients = users.filter(user => {
        const ageMatch = !filterCriteria.age || (user.age && user.age.toString() === filterCriteria.age);
        const workplaceMatch = !filterCriteria.workplace || (user.workplace && user.workplace.toLowerCase().includes(filterCriteria.workplace.toLowerCase()));
        const descriptionMatch = !filterCriteria.description || (user.description && user.description.toLowerCase().includes(filterCriteria.description.toLowerCase()));
        const paidMatch = !filterCriteria.paid || (user.paid && user.paid.toString() === filterCriteria.paid.toString());

        return (
            user.role === "client" &&
            user.name.toLowerCase().includes(searchInput.toLowerCase()) &&
            ageMatch &&
            workplaceMatch &&
            descriptionMatch &&
            paidMatch
        );
    });

    return (
        <main className={style.main}>
            <h1>Clients</h1>
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
                        <label htmlFor="filterDescription"><a className={certificateStyle.glosarij} href={links.glosarij_Description_Client} target="_blank">Description</a>:</label>
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
                            <th>Position</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Description_Client} target="_blank">Description</a></th>
                            <th>Workplace</th>
                            <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Paid} target="_blank">Paid</a></th>
                        </tr>
                        </thead>
                        <tbody className="thead-main">
                        {filteredClients.map((client, index) => (
                            <React.Fragment key={client.id}>
                                <tr  key={client.id} onClick={() => handleRowClick(client.id)} className={expandedClientId === client.id ? style.rowExpanded : ''}
                                >
                                    <td>{index + 1}</td>
                                    <td>{client.name}</td>
                                    <td>{client.role}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={client.mail}
                                            onChange={(e) => handleClientInfoEdit(client.id,'mail', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={style.age}
                                            type="text"
                                            value={client.age}
                                            onChange={(e) => handleClientInfoEdit(client.id,'age', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={style.description}
                                            type="text"
                                            value={client.description}
                                            onChange={(e) => handleClientInfoEdit(client.id,'description', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={style.workplace}
                                            type="text"
                                            value={client.workplace}
                                            onChange={(e) => handleClientInfoEdit(client.id,'workplace', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={style.paid}
                                            type="text"
                                            value={client.paid}
                                            onChange={(e) => handleClientInfoEdit(client.id,'paid', e.target.value)}
                                        />
                                    </td>
                                </tr>
                                {expandedClientId === client.id && (

                                    <tr key={`expanded-${client.id}`}>
                                        <td colSpan="8">
                                            <table className={`table ${style.innerTable}`}>
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Status} target="_blank">Status</a></th>
                                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Detective} target="_blank">Detective</a></th>
                                                    <th><a className={certificateStyle.glosarij} style={{ color: 'white' }} href={links.glosarij_Description_Case} target="_blank">Description</a></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {cases
                                                    .filter(cas => cas.client === client.name)
                                                    .map((cas, index) => (
                                                        <tr key={`case-${cas.id}`}>
                                                            <td>{cas.name}</td>
                                                            <td>{cas.date}</td>
                                                            <td>{cas.status}</td>
                                                            <td>{cas.detective}</td>
                                                            <td>{cas.description}</td>
                                                        </tr>
                                                    ))
                                                }
                                                <div className={certificateStyle.tableCertificate}>
                                                    <a href={links.allClients_casesInformationClient} target="_blank">This part</a>
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                </div>
                                                </tbody>
                                            </table>
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
                <a href={links.all_clients} target="_blank">About this page</a>
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>
        </main>
    );
};

export default Main;
