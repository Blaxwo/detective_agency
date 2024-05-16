import fileContent from "../assets/mist.jpg"
const initialState = {
    cases:JSON.parse(localStorage.getItem('cases')) || [
        {id: 1, name:"Child custody fight", status: "ongoing", detective: "Suzi", client: "Mark", date: "2022-12-12", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment1", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment2", fileContent:fileContent},{fileId: 3, fileDate: "2023-10-19", fileComment:"comment3", fileContent:fileContent}], phase: "in review"},
        {id: 2, name:"Lost cat", status: "ongoing", detective: "Zak", client: "Mark", date: "2022-05-03",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment4", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment5", fileContent:fileContent},{fileId: 3, fileDate: "2023-10-19", fileComment:"comment6", fileContent:fileContent}], phase: "approved"},
        {id: 3, name:"Suspicion of treason", status: "ongoing", detective: "Suzi", client: "April",date: "2002-12-12", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment7", fileContent:fileContent }], phase: "in review"},
        {id: 4, name: "Brand Protection Investigations ", status: "ongoing", detective: "Luke", client: "Alex",date: "2024-10-11", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment8", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment9", fileContent:fileContent}], phase: "approved"},
        {id: 5, name: "Employee loyalty check", status: "done", detective: "Luke", client: "Alex",date: "2023-04-10", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment10", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment11", fileContent:fileContent},{fileId: 3, fileDate: "2023-10-19", fileComment:"comment12", fileContent:fileContent},{fileId: 4, fileDate: "2023-09-29", fileComment:"comment13", fileContent:fileContent },{fileId: 5, fileDate: "2023-09-02", fileComment:"comment14", fileContent:fileContent},{fileId: 6, fileDate: "2023-10-19", fileComment:"comment15", fileContent:fileContent}], phase: "done"},

        {id: 6, name: "Lost a bird", status: "done", detective: "Zak", client: "Simon", date: "2023-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 7, name: "Lost a bird2", status: "done", detective: "Zak", client: "Simon", date: "2024-05-07",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 8, name: "Lost a bird3", status: "done", detective: "Suzi", client: "Simon", date: "2002-05-07",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 9, name: "Lost a bird4", status: "done", detective: "Suzi", client: "Simon", date: "2022-05-07",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 10, name: "Lost a bird5", status: "done", detective: "Suzi", client: "Simon", date: "2022-05-07",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", files: [], phase: "done"},
        {id: 11, name: "Lost a bird6", status: "done", detective: "Suzi", client: "Simon", date: "2024-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 12, name: "Lost a bird7", status: "done", detective: "Luke", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 13, name: "Lost a bird8", status: "done", detective: "Luke", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 14, name: "Lost a bird9", status: "done", detective: "Luke", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 15, name: "Lost a bird10", status: "done", detective: "Luke", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 16, name: "Lost a bird11", status: "done", detective: "Luke", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 17, name: "Lost a bird12", status: "done", detective: "Luke1", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 18, name: "Lost a bird13", status: "done", detective: "Luke2", client: "Simon", date: "2002-05-05",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
        {id: 19, name: "Lost a bird14", status: "done", detective: "Luke1", client: "Simon", date: "2002-05-07",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa", files: [{fileId: 1, fileDate: "2023-09-29", fileComment:"comment", fileContent:fileContent },{fileId: 2, fileDate: "2023-09-02", fileComment:"comment", fileContent:fileContent}], phase: "done"},
    ],
    newCases: JSON.parse(localStorage.getItem('newCases')) || [],
    canceledCases: JSON.parse(localStorage.getItem('canceledCases')) || [],
};
const casesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CASE':
            const updatedCases = [...state.cases, action.payload];
            localStorage.setItem('cases', JSON.stringify(updatedCases));
            return {
                ...state,
                cases:updatedCases
            };
        case 'ADD_CASE_TO_CANCELED':
            const updatedCanceledCases = [...state.canceledCases, action.payload];
            localStorage.setItem('canceledCases', JSON.stringify(updatedCanceledCases));
            return {
                ...state,
                canceledCases:updatedCanceledCases
            };
        case 'REQUEST_FOR_NEW_CASE':
            const updatedNewCases = [...state.newCases, action.payload];
            localStorage.setItem('newCases', JSON.stringify(updatedNewCases));
            return {
                ...state,
                newCases: updatedNewCases
            };
        case 'REMOVE_FROM_NEW_CASES':
            const filteredNewCases = state.newCases.filter(caseItem => caseItem !== action.payload);
            localStorage.setItem('newCases', JSON.stringify(filteredNewCases));
            return {
                ...state,
                newCases: filteredNewCases
            };
        case 'UPDATE_CASE':
            console.log("1")
            const updatedInfoCases = state.cases.map(cas => {
                if (cas.id === action.payload.id) {
                    console.log("2")
                    return {
                        ...cas,
                        ...action.payload.updatedFields
                    };
                }
                return cas;
            });
            const newStateUpdate = {
                ...state,
                cases: updatedInfoCases
            };
            localStorage.setItem('cases', JSON.stringify(newStateUpdate.cases));
            return newStateUpdate;
        case "UPDATE_CASE_PHASE":
            const updatedCasesForPhase = state.cases.map(cas => {
                if (cas.id === action.payload.id) {
                    return {
                        ...cas,
                        phase: action.payload.phase
                    };
                }
                return cas;
            });
            const newCasPhaseUpdate = {
                ...state,
                cases: updatedCasesForPhase
            };
            localStorage.setItem('cases', JSON.stringify(newCasPhaseUpdate.cases));
            return newCasPhaseUpdate;
        default:
            return state;
    }
};
export const updateCasePhase = (id, phase) => {
    return {
        type: "UPDATE_CASE_PHASE",
        payload: { id, phase }
    };
};
export const updateCases = (id, updatedFields) => {
    return {
        type: 'UPDATE_CASE',
        payload: {
            id,
            updatedFields
        }
    }
};
export const getDetectiveCases = (currentUser) => {
    return initialState.cases.filter(caseItem => caseItem.detective.toString() == currentUser);
};

export const getClientCases = (currentUser) => {
    return initialState.cases.filter(caseItem => caseItem.client.toString() == currentUser);
};

export const getNewCases = () => {
    return JSON.parse(localStorage.getItem('newCases')) || initialState.newCases;
};
export const getCases = () => {
    return JSON.parse(localStorage.getItem('cases')) || initialState.cases;
};

export const getCanceledCases = () => {
    return JSON.parse(localStorage.getItem('canceledCases')) || initialState.canceledCases;
};
export const addCase = (newCase) => {
    const cases = JSON.parse(localStorage.getItem('cases')) || initialState.cases;
    const updatedCases = [...cases, newCase];
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    return {
        type: 'ADD_CASE',
        payload: newCase
    };
};
export const addCanceledCase = (canceledCase) => {
    const canceledCases = JSON.parse(localStorage.getItem('canceledCases')) || []
    const updatedCanceledCases = [...canceledCases, canceledCase];
    localStorage.setItem('canceledCases', JSON.stringify(updatedCanceledCases));
    return {
        type: 'ADD_CASE_TO_CANCELED',
        payload: canceledCase
    };
};
export const sendRequestForNewCase = (newCase) => {
    const newCases = JSON.parse(localStorage.getItem('newCases')) || [];
    //?
    const updatedNewCases = [...newCases, newCase];
    localStorage.setItem('newCases', JSON.stringify(updatedNewCases));
    return {
        type: 'REQUEST_FOR_NEW_CASE',
        payload: newCase
    };
};
export const removeFromNewCases = (caseToRemove) => {
    const newCases = initialState.newCases.filter(caseItem => caseItem !== caseToRemove);
    localStorage.setItem('newCases', JSON.stringify(newCases));
    return {
        type: 'REMOVE_FROM_NEW_CASES',
        payload: caseToRemove
    };
};

export default casesReducer;
