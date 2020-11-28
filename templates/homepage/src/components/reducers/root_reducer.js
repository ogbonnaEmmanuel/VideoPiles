const initState = {
    error_state : {
        open:false,
        message: ''
    },
    pile_input: '',
}

const RootReducer = (state=initState,action)=>{
    switch (action.type) {
        case 'error_state':
            let error_state = state.error_state;
            error_state.open = action.error_state;
            error_state.message = action.error_msg;
            return {
                ...state,
                error_state
            }
        case 'pile_input':
            let pile_input = action.pile_input
            return {
                ...state,
                pile_input
            }
        default:
            return state
    }
}
export default RootReducer