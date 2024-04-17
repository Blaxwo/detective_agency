import React, { useState } from "react";
import style from "./MyCasesClient.module.css"
import { getClientCases, sendRequestForNewCase } from "../../../Redux/casesReducer";
import {useSelector} from "react-redux";

const Main = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log(currentUser)
    const [newCaseName, setNewCaseName] = useState(""); // Состояние для названия нового дела
    const [selectedDetective, setSelectedDetective] = useState(""); // Состояние для выбранного детектива
    const [caseDescription, setCaseDescription] = useState("");
    const clientCases = getClientCases(currentUser);
    console.log(clientCases);
    const allCases = useSelector(state => Object.values(state.casesPage.cases));
    const newCase = {
        id: allCases.length,
        name: newCaseName,
        status: "in review",
        detective: selectedDetective,
        client: currentUser,
        description: caseDescription
    }
    const handleNewCaseSubmit = () => {
        if(newCaseName&&selectedDetective){
            sendRequestForNewCase(newCase);
            setNewCaseName("");
            setSelectedDetective("");
            setCaseDescription("");
        } else {
            alert("Please fill in all fields.");
        }
    };
    return (
        <main className={style.main}>
            <div className={style.clientsCases}>
                <div className={style.caseList}>
                    <h2>Clients Cases</h2>
                    <ul>
                        {clientCases.map((caseItem, index) => (
                            <li key={index} className={style.caseItem}>
                                {caseItem.name} - Status: {caseItem.status} - Detective: {caseItem.detective} - Description: {caseItem.description}
                            </li>
                        ))}
                    </ul>
                </div>
                <h2>Add New Case</h2>
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
                <p className={style.infoMessage}>After sending a new case for review, expect a new case to appear on your cases list during the day; if it does not appear after the time has passed, then it has been rejected. Connect us if you think there was a mistake.</p>
            </div>
        </main>
    );
};


export default Main;