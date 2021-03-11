import React from 'react';
import { useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {getMoveInfo, startLoading, stopLoading} from '../../actions';

const MoveSetList = () => {
    const history = useHistory();
    const info = useSelector((state => state.info));
    const dispatch = useDispatch();

    // Renders the move set
    const renderMoveSet = () => {
        const moveSet = info.moves;
        let learnMethod = '';
        return moveSet.map((move,index) => {
            learnMethod = getMethod(move);
            const moveName = move.move.name;
            return (
                <li key={index} className="move" onClick={() => updateMoveState(moveName)} ><p className='move-link'>{moveName.replace("-"," ").toUpperCase()}</p>
                <p className="learn-method">{learnMethod}</p>
                </li>
            )
        })
    }

    // Updates move info state
    const updateMoveState = async (moveName) => {
        dispatch(startLoading())
        await dispatch(getMoveInfo(moveName))
        await history.push("/moves")
        dispatch(stopLoading())
    }

    // gets the method used to learn move
    const getMethod = (move) => {
        const version = move.version_group_details;
        const method = version[version.length - 1].move_learn_method.name;
             if(method === 'level-up') {
                 const level = version[version.length - 1].level_learned_at;
                 return `Learned at level ${level}`
             }
             else if(method === 'egg') {
                 return 'Egg'
             }
             else {
                 return "TM"
             }
     }

    return (
        <div className="row5">
            <p>Moveset</p>
            <div className="move-set">
                {renderMoveSet()}
            </div>
        </div> 
    )    
}

export default MoveSetList;
