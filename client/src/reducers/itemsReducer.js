const itemsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ITEM_LIST_DATA':
           return [...action.payload]
        case 'ITEM_SEARCH_DATA':
            const foundItem = [];
            const allItems = JSON.parse(localStorage.getItem('items-data'))
            const regexp = new RegExp(`${action.payload}`)
            allItems.forEach((item) => {
                if(item.name.match(regexp)) foundItem.push(item)
            });
            return foundItem
        default:
            return state
    }
}

export default itemsReducer;