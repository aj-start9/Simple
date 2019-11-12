const initialState = {
    token: null,
    change: ''

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
        case 'change':
            return {
                ...state,
                change: action.value
            };
        default:
            return state;
    }
};

export default reducer;