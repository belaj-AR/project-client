export default (id) => {
    return (dispatch) => {



        dispatch({
            type: 'ITEM_LOADING'
        });


        dispatch({
            type: 'ADD_ITEM_SUCCESS',
            payload: data
        })


        dispatch({
            type: 'ITEM_ERROR'
        });
        

    };
};
    
