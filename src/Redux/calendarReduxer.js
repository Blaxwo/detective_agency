// Constants
export const SET_DETECTIVE_CALENDARS = 'SET_DETECTIVE_CALENDARS';

// Initial state
const initialState = {
    calendars: [
        {owner: "Suzi", calendar: "https://calendar.google.com/calendar/embed?src=e732e60fbd5b34beda98ca85cd02b84d53df25cb0a46c8aa8b5813110ab85c98%40group.calendar.google.com&ctz=UTC"},
        {owner: "Zak", calendar: "https://calendar.google.com/calendar/embed?src=0efd2f467be0245abe0a04eb2ab99cd049b139224396cc3c982e381dfa1725fa%40group.calendar.google.com&ctz=UTC"},
        {owner: "Luke", calendar: "https://calendar.google.com/calendar/embed?src=c452649ed7d4d1c6829695e1f9064f0a79680831e0bd1cfc3adb1ec402905c58%40group.calendar.google.com&ctz=UTC"}
    ], // Массив календарей для каждого детектива
};

// Reducer
const calendarsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETECTIVE_CALENDARS:
            return {
                ...state,
                calendars: action.payload,
            };
        default:
            return state;
    }
};

// Action creator
export const setDetectiveCalendars = (calendars) => ({
    type: SET_DETECTIVE_CALENDARS,
    payload: calendars,
});

export default calendarsReducer;
