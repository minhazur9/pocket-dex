import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getItems, startLoading, stopLoading } from '../actions';

const ItemIndex = () => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getItems())
    })

    return (
        <div className="move-index">
            <div className="input-field">
            {/* <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/> */}
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {/* {renderMoves()} */}
            </div>
            {/* {moveInfo && 
            <MoveInfo/>
            }      */}
        </div>
        
    )

}

export default ItemIndex;