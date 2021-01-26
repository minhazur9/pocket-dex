import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getItems, startLoading, stopLoading } from '../actions';

const ItemIndex = () => {
    const items = useSelector(state => state.items);
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

      // Changes info
    const updateInfo = async(move) => {
        dispatch(startLoading())
        // await dispatch(getMoveInfo(move))
        dispatch(stopLoading())
    }

    const renderItems = () => {
        return items.map((item) => {
            const itemName = item.name.replace('-',' ')
            return (
                <button id={item.name} key={item.name}>
                    {itemName.toUpperCase()}
                </button>
            )
        })
    }

    useEffect(() => {
        dispatch(getItems())
        // eslint-disable-next-line
    },[])

    return (
        <div className="move-index">
            <div className="input-field">
            {/* <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/> */}
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderItems()}
            </div>
            {/* {moveInfo && 
            <MoveInfo/>
            }      */}
        </div>
        
    )

}

export default ItemIndex;