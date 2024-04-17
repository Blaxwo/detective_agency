
export const SET_USER_ROLES = 'SET_USER_ROLES';
const initialState = {
    roles: [
        "Manager", "Detective", "Client"
    ],
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ROLES:
            return {
                ...state,
                roles: action.payload,
            };
        default:
            return state;
    }
};

export const setUserRoles = (roles) => ({
    type: SET_USER_ROLES,
    payload: roles,
});
export default rolesReducer;