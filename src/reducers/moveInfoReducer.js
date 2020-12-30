const moveInfoReducer = (state = '', action) => {
    switch(action.type) {
        case 'MOVE_INFO_DATA':
           return action.payload
        default:
            return state
    }
}

export default moveInfoReducer;