const abilitesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ABILITY_LIST_DATA':
           return [...action.payload]
        case 'ABILITY_SEARCH_DATA':
            const foundAbility = [];
            const allAbilities = JSON.parse(localStorage.getItem('abilities-data'))
            const regexp = new RegExp(`${action.payload}`)
            allAbilities.forEach((ability) => {
                if(ability.name.match(regexp)) foundAbility.push(ability)
            });
            console.log(foundAbility)
            return foundAbility
        default:
            return state
    }
}

export default abilitesReducer;