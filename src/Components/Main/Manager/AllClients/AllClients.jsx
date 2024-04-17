import React from "react";
import style from "./AllClients.module.css";
import { useSelector } from 'react-redux';
const Main = () => {
    const users = useSelector(state => state.usersPage.users);
    console.log(users);

    const clients = users.filter(user => user.role === "client");
    console.log(clients);

    return (
        <main className={style.main}>
            <h1>Clients</h1>
            <div className={style.clients}>
                {clients.map(client => (
                    <div key={client.id} className={style.clientsCart}>
                        <div className={style.detectiveInfo}>
                            <h3>{client.name}</h3>
                            <p><strong>Role:</strong> {client.role}</p>
                            <p><strong>Email:</strong> {client.mail}</p>
                            <p><strong>Age:</strong> {client.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Main;

