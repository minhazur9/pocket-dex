const moveInfoReducer = (state = false, action) => {
    switch(action.type) {
        case 'USER_DATA':
           return true;
        default:
            return state
    }
}

export default moveInfoReducer;