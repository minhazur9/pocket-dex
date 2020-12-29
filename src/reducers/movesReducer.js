const movesReducer = (state = [], action) => {
    switch(action.type) {
        case 'MOVES_LIST_DATA':
           return [ ...action.payload]
        case 'MOVES_SEARCH_DATA':
            const foundMoves = [];
            const allMoves = JSON.parse(localStorage.getItem('moves-list-data'))
            const regexp = new RegExp(`^${action.payload}`)
            allMoves.forEach((moves) => {
                if(moves.name.match(regexp)) foundMoves.push(moves)
            });
            return foundMoves
        default:
            return state
    }
}

export default movesReducer;