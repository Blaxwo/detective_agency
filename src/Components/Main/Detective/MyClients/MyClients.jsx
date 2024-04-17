import React from "react";
import { getClientCases } from "../../../../Redux/casesReducer";
import { useSelector } from "react-redux";
import style from './MyClients.module.css'

const DetectiveClients = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allCases =  useSelector(state => state.casesPage.cases);
    const allUsers = useSelector(state=>state.usersPage.users)

    console.log("1");
    console.log(allCases)
    const currentDetectiveCases = allCases.filter((caseItem)=>caseItem.detective===currentUser.name);
    console.log("2");
    console.log(currentDetectiveCases)
    const currentDetectiveClients =  Array.from(new Set(currentDetectiveCases.map(caseItem => caseItem.client)));
    console.log("3");
    console.log(currentDetectiveClients)

    return (
        <div>
            <h2>Detecive's Clients</h2>
            <div className={style.clients}>
                {currentDetectiveClients.map((client, index) => (
                    <div key={index} className={style.clientsCart}>
                        <h3>{client}</h3>
                        <p><strong>Role:</strong> {(allUsers.find(user=>user.name===client).role)}</p>
                        <p><strong>Email:</strong> {(allUsers.find(user=>user.name===client).mail)}</p>
                        <p><strong>Age:</strong> {(allUsers.find(user=>user.name===client).age)}</p>
                        <ul>
                            {currentDetectiveCases
                                .filter((caseItem) => caseItem.client === client)
                                .map((caseItem, index) => (
                                    <li key={index}>
                                        {caseItem.name} - Status: {caseItem.status}
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetectiveClients;
