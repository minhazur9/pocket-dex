import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getItems, searchItems, getItemInfo, startLoading, stopLoading } from '../actions';

import ItemInfo from '../components/items/ItemInfo';

const ItemIndex = () => {
    const items = useSelector(state => state.items);
    const itemInfo = useSelector(state => state.itemInfo);
    const dispatch = useDispatch(); 

    // Renders new info component
    const select = (e) => {
        highlight(e)
        updateInfo(e.target.id)
    }

    // Highlights selection
    const highlight = (e) => {
        const highlighted = e.target.classList.contains("selected")
        if(highlighted) return;
        const buttons = document.querySelectorAll(".list button");
        buttons.forEach((button) => {
            button.classList.remove('selected')
        });
        e.target.classList.toggle('selected');
     }

     const search = (e) => {
         dispatch(searchItems(e.target.value.replace(" ", "-").toLowerCase()))
         if (e.keyCode === 13) updateInfo(document.querySelector(".list button").id)
     }

      // Changes info
    const updateInfo = async(item) => {
        dispatch(startLoading())
        await dispatch(getItemInfo(item))
        dispatch(stopLoading())
    }

    // Render all the items in a list
    const renderItems = () => {
        return items.map((item) => {
            const itemName = item.name.replace('-',' ')
            return (
                <button id={item.name} key={item.name} onClick={select} >
                    {itemName.toUpperCase()}
                </button>
            )
        })
    }

    useEffect(() => {
        dispatch(getItems())
        return items
        // eslint-disable-next-line
    },[])

    return (
        <div className="move-index">
            <div className="input-field">
            <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/>
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderItems()}
            </div>
            {itemInfo && 
            <ItemInfo/>
            }     
        </div>
        
    )

}

export default ItemIndex;