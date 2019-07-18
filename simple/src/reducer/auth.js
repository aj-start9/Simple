const initialState = {
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'authcheck':
            return {
                ...state,
                token: action.value

            };

        case 'login':
            return {
                ...state,
                token: action.value
            };
        default:
            return state;
    }
};

export default reducer;