import React from 'react';
import { Link,useHistory } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {getMoveInfo} from '../../actions';

const MoveSetList = () => {
    const history = useHistory();
    const info = useSelector((state => state.info));
    const dispatch = useDispatch();

    const renderMoveSet = () => {
        const moveSet = info.moves;
        let learnMethod = '';
        return moveSet.map((move,index) => {
            learnMethod = getMethod(move);
            const moveName = move.move.name;
            return (
                <li key={index} className="move"><p className='move-link' onClick={(e) => updateMoveState(e,moveName)} to="">{moveName}</p>
                <p className="learn-method">{learnMethod}</p>
                </li>
            )
        })
    }

    const updateMoveState = async (e,moveName) => {
        await dispatch(getMoveInfo(moveName))
        history.push("/moves")
    }

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
        <div className="col4">
            <p>Moveset</p>
            <div className="move-set">
                {renderMoveSet()}
            </div>
        </div> 
    )    
}

export default MoveSetList;
