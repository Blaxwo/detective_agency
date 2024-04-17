import React from "react";
import style from "../../Main.module.css";
import { useSelector } from 'react-redux';
import Calendar from "../../AllUsers/Calendar/Calendar";
const Main = () => {
    const users = useSelector(state => state.usersPage.users);
    console.log(users);

    const detectives = users.filter(user => user.role === "detective");
    console.log(detectives);

    return (
        <main className={style.main}>
            <h1 className={style.heading}>Detectives</h1>
            <div className={style.detectivesListWithCalendar}>
                {detectives.map(detective => (
                    <div key={detective.id} className={style.detective}>
                        <img src={detective.img} alt={detective.name} className={style.detectivePhoto} />
                        <div className={style.detectiveInfo}>
                            <h2 className={style.detectiveNameWithCalendar}>{detective.name}</h2>
                            <p className={style.info}><strong>Role:</strong> {detective.role}</p>
                            <p className={style.info}><strong>Experience:</strong> {detective.experience}</p>
                            <Calendar calendarLink={detective.calendar}/>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Main;

