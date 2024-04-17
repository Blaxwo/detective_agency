import React, {useEffect, useState} from "react";
import style from "./NewCases.module.css";
import { getNewCases, addCase, removeFromNewCases } from "../../../../Redux/casesReducer";
import { useSelector, useDispatch } from 'react-redux';

const Main = () => {

    const dispatch = useDispatch(); // Получаем функцию dispatch
    const newCases = useSelector((state) => state.casesPage.newCases)|| [];

    const handleConfirmNewCase = (newCase) => {
        newCase.status = "ongoing";
        addCase(newCase);
        dispatch(removeFromNewCases(newCase));
    };

    const handleCancelNewCase = (newCase) => {
        dispatch(removeFromNewCases(newCase));
        // Дополнительные действия при отмене нового дела
    };

    return (
        <main className={style.main}>
            <div className={style.newCases}>
                <h2>New Cases</h2>
                <ul>
                    {newCases.map((caseItem, index) => (
                        <li key={index}>
                            {caseItem.name} - Status: {caseItem.status}
                            <button onClick={() => handleConfirmNewCase(caseItem)}>Confirm</button>
                            <button onClick={() => handleCancelNewCase(caseItem)}>Cancel</button>
                        </li>
                    ))}
                </ul>
                {/*<h2>Add New Case</h2>*/}
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Case Name"*/}
                {/*    value={newCaseName}*/}
                {/*    onChange={(e) => setNewCaseName(e.target.value)}*/}
                {/*/>*/}
                {/*<button onClick={handleAddNewCase}>Add Case</button>*/}
            </div>
        </main>
    );
};

export default Main;
