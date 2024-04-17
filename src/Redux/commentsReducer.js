export const ADD_COMMENT = 'ADD_COMMENT';

const initialState = {
    comments: [
        {
            id: 1,
            author: 'John Doe',
            text: 'This is the first comment',
            date: new Date().toISOString()
        },
        {
            id: 2,
            author: 'Jane Smith',
            text: 'This is the second comment',
            date: new Date().toISOString()
        }
    ],
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        default:
            return state;
    }
};

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

export default commentsReducer;
