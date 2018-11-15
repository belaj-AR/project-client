let defaultState = {
    items: [],
    loading: false,
    error: false,
};

const itemReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM_SUCCESS':
            return {
                ...state,
                item: state.items.concat(action.payload),
                loading: false,
                error: false
            }
        case 'ITEM_LOADING' :
            return {
                ...state,
                loading: true
            }
        case 'ITEM_ERROR' :
            return {
                error: true,
                loading: false
            }
        case 'CLEAR_ITEMS' :
            return {
                items: [],
                loading: false,
                error: false,
            }
        default:
            return state;
    }
}

export default itemReducer;