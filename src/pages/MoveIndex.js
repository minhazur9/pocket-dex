import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getMoves, getMoveInfo, searchMoves, startLoading, stopLoading } from '../actions';
import MoveInfo from '../components/moves/MoveInfo';

const MoveIndex = () => {
    const dispatch = useDispatch()
    const moves = useSelector(state => state.moves)
    const moveInfo = useSelector(state => state.moveInfo)

    // Highlights selection and changes info to selected move's
    const select = (e) => {
        highight(e)
        updateInfo(e.target.id)
    }

    // Highlights selection
    const highight = (e) => {
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
        await dispatch(getMoveInfo(move))
        dispatch(stopLoading())
    }

    // Changes the Pokemon depending on what is typed
    const search = (e) => {
        dispatch(searchMoves(e.target.value.replace(" ", "-").toLowerCase()))
        if (e.keyCode === 13) updateInfo(document.querySelector(".list button").id)
    }

    // Render moves to display
    const renderMoves = () => {
        return moves.map((move) => {
            const moveName = move.name.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
            .join(' ');
            return (
                <button id={move.name} onClick={select} key={move.name}>
                        {moveName.toUpperCase()}
                    </button>
            )
        })
    }

    // Gets all the moves
    useEffect(() => {
        dispatch(getMoves())
        return moves;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="move-index">
            <div className="input-field">
            <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/>
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderMoves()}
            </div>
            {moveInfo && 
            <MoveInfo/>
            }     
        </div>
        
    )
}

export default MoveIndex;