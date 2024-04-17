const initialState = {
    cases:JSON.parse(localStorage.getItem('cases')) || [
        {id: 1, name:"Child custody fight", status: "ongoing", detective: "Suzi", client: "Mark", date: "12-12-2022", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        {id: 2, name:"Lost cat", status: "ongoing", detective: "Zak", client: "Mark", date: "03-05-2022",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
        {id: 3, name:"Suspicion of treason", status: "ongoing", detective: "Suzi", client: "April",date: "12-12-2002", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 4, name: "Brand Protection Investigations ", status: "ongoing", detective: "Luke", client: "Alex",date: "11-10-2024", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 5, name: "Employee loyalty check", status: "done", detective: "Luke", client: "Alex",date: "10-04-2023", description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},

        {id: 6, name: "Lost a bird", status: "done", detective: "Zak", client: "Simon", date: "05-05-2023",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 7, name: "Lost a bird", status: "done", detective: "Zak", client: "Simon", date: "07-05-2024",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 8, name: "Lost a bird", status: "done", detective: "Suzi", client: "Simon", date: "07-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 9, name: "Lost a bird", status: "done", detective: "Suzi", client: "Simon", date: "07-05-2022",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 10, name: "Lost a bird", status: "done", detective: "Suzi", client: "Simon", date: "07-05-2022",description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."},
        {id: 11, name: "Lost a bird", status: "done", detective: "Suzi", client: "Simon", date: "05-05-2024",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 12, name: "Lost a bird", status: "done", detective: "Luke", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 13, name: "Lost a bird", status: "done", detective: "Luke", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 14, name: "Lost a bird", status: "done", detective: "Luke", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 15, name: "Lost a bird", status: "done", detective: "Luke", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 16, name: "Lost a bird", status: "done", detective: "Luke", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 17, name: "Lost a bird", status: "done", detective: "Luke1", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 18, name: "Lost a bird", status: "done", detective: "Luke2", client: "Simon", date: "05-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
        {id: 19, name: "Lost a bird", status: "done", detective: "Luke1", client: "Simon", date: "07-05-2002",description: "aaaaaaaaaaaaaaaaaaaaaaaaaa"},
    ],
    newCases: JSON.parse(localStorage.getItem('newCases')) || []
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
        default:
            return state;
    }
};

export const getDetectiveCases = (currentUser) => {
    return initialState.cases.filter(caseItem => caseItem.detective.toString() == currentUser);
};

export const getClientCases = (currentUser) => {
    return initialState.cases.filter(caseItem => caseItem.client.toString() == currentUser);
};

export const getNewCases = () => {
    return initialState.newCases;
};

export const addCase = (newCase) => {
    const cases = initialState.cases;
    const updatedCases = [...cases, newCase];
    localStorage.setItem('cases', JSON.stringify(updatedCases));
    return {
        type: 'ADD_CASE',
        payload: newCase
    };
};

export const sendRequestForNewCase = (newCase) => {
    const newCases = JSON.parse(localStorage.getItem('newCases')) || [];
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
