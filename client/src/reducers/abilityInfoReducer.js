const abilityInfoReducer = (state = '', action) => {
    switch(action.type) {
        case 'ABILITY_INFO_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default abilityInfoReducer;