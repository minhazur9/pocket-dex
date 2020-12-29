import React from 'react';
import {useSelector} from 'react-redux';

const MoveSetList = () => {
    const info = useSelector((state => state.info))

    const renderMoveSet = () => {
        const moveSet = info.moves;
        let learnMethod = '';
        return moveSet.map((move,index) => {
            learnMethod = getMethod(move);
            return (
                <li key={index} className="move">{move.move.name}  
                <p className="learn-method">{learnMethod}</p>
                </li>
            )
        })
    }

    const getMethod = (move) => {
        const version = move.version_group_details;
        const method = version[version.length - 1].move_learn_method.name;
             if(method === 'level-up') {
                 const level = version[version.length - 1].level_learned_at;
                 return `Move learned at level ${level}`
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
