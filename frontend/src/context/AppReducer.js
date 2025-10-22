const AppReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'SET_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.payload.filterType]: action.payload.value
                }
            }
        default: 
        return state;
    }
}

export default AppReducer;