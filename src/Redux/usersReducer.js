import avatarWoman from "../assets/avatarWoman.png"
import avatarMan from "../assets/avatarMan.png"
const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [
        {id: 1, role: "manager", name: "Bobo", password: 1002},
        {id: 2, role: "detective", name: "Suzi", password: 8888, gender: "female", mail: "suzi@gmail.com",office:"Fujishiro", img:avatarWoman, experience: "5 years", calendar: "https://calendar.google.com/calendar/embed?src=e732e60fbd5b34beda98ca85cd02b84d53df25cb0a46c8aa8b5813110ab85c98%40group.calendar.google.com&ctz=UTC"},
        {id: 3, role: "detective", name: "Zak", password: 1234, gender: "male", mail: "zak@gmail.com", office:"Fujishiro",img:avatarMan, experience: "2 years",  calendar: "https://calendar.google.com/calendar/embed?src=0efd2f467be0245abe0a04eb2ab99cd049b139224396cc3c982e381dfa1725fa%40group.calendar.google.com&ctz=UTC"},
        {id: 4, role: "detective", name: "Luke", password: 7699, gender: "male", mail: "luke@gmail.com", office:"Damietta",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},
        {id: 5, role: "detective", name: "Luke1", password: 7699, gender: "male",mail: "luke1@gmail.com",office:"Rameshki",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},
        {id: 6, role: "detective", name: "Luke2", password: 7699, gender: "male",mail: "luke2@gmail.com",office:"Rameshki",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},
        {id: 7, role: "detective", name: "Luke3", password: 7699, gender: "male",mail: "luke3@gmail.com",office:"Damietta",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},
        {id: 8, role: "detective", name: "Luke4", password: 7699, gender: "male",mail: "luke4@gmail.com",office:"Rameshki",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},
        {id: 9, role: "detective", name: "Luke5", password: 7699, gender: "male",mail: "luke5@gmail.com",office:"Rameshki",img:avatarMan, experience: "10 years", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"},

        {id: 10, role: "client", name: "Mark", password: 3232, mail: "mark@gmail.com", age: 30, description: "Nice young man", workplace: "Gardener", paid: "Yes"},
        {id: 11, role: "client", name: "April", password: 1221, mail: "april@gmail.com", age: 62, description: "Very energetic woman", workplace: "Nurse", paid: "Yes"},
        {id: 12, role: "client", name: "Alex", password: 4000, mail: "alex@gmail.com", age: 30, description: "Paranoid, scared to have a traitor in his company", workplace: "Businessman", paid: "Yes"},
        {id: 13, role: "client", name: "Simon", password: 3333, mail: "simon@gmail.com", age: 18, description: "Always loose his favorite bird", workplace: "Unemployed", paid: "No"},
        // {id: 9, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 10, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 11, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 12, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 13, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 14, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
        // {id: 15, role: "client", name: "Simon", password: 3333, cases: [{name: "Lost a bird", status: "done"}]},
    ],
    loading: true,
    error: null,
};
const DETECTIVE_ROLE = "detective";
const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_USER':
            const newState = {
                ...state,
                users: [...state.users, action.payload]
            };
            localStorage.setItem('users', JSON.stringify(newState.users));
            return newState;
        case 'UPDATE_USER':
            console.log("1")
            const updatedUsers = state.users.map(user => {
                if (user.id === action.payload.id) {
                    console.log("2")
                    return {
                        ...user,
                        ...action.payload.updatedFields
                    };
                }
                return user;
            });
            const newStateUpdate = {
                ...state,
                users: updatedUsers
            };
            localStorage.setItem('users', JSON.stringify(newStateUpdate.users));
            return newStateUpdate;
        default:
            return state;
    }
};
export const getDetectives = () => {
    return initialState.users.filter(user => user.role.toString() === DETECTIVE_ROLE);
};
export const addNewClient = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    };
}
export const updateUser = (id, updatedFields) => {
    return {
        type: 'UPDATE_USER',
        payload: {
            id,
            updatedFields
        }
    };
};

export default usersReducer;