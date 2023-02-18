export const optionReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_COL":
            return { ...action.payload }; //spread Operator
        default:
            return state;
    }
};
