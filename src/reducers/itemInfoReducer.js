const itemInfoReducer = (state = '', action) => {
    switch(action.type) {
        case 'ITEM_INFO_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default itemInfoReducer;