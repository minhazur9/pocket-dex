import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAbilities, searchAbilities, startLoading, stopLoading } from '../actions';

const AbilityIndex = () => {
    const abilities = useSelector(state => state.abilities)
    const dispatch = useDispatch()


    const search = (e) => {         
        dispatch(searchAbilities(e.target.value.replace(" ", "-").toLowerCase()))
    }


    const renderAbilites = () => {
        return abilities.map((ability,index) => {
            const abilityName = ability.name.split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
            .join(' ');
            return (
                <button id={ability.name} key={ability.name+index}>
                    {abilityName.toUpperCase()}
                </button>
            )
        })
    }
    

    // Gets all the abilties
    useEffect(() => {
        dispatch(getAbilities())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="move-index">
            <div className="input-field">
            <input onKeyUp={search} id="icon_prefix" type="text" className="validate"/>
            <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="list">
                {renderAbilites()}
            </div>
            {/* {moveInfo && 
            <MoveInfo/>
            }      */}
        </div>
        
    )
}

export default AbilityIndex;