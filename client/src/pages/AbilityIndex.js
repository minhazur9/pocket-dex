import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAbilities, searchAbilities, getAbilityInfo, startLoading, stopLoading } from '../actions';

import AbilityInfo from '../components/abilities/AbilityInfo';

const AbilityIndex = () => {
    const abilities = useSelector(state => state.abilities)
    const abilityInfo = useSelector(state => state.abilityInfo)
    const dispatch = useDispatch()

    // Highlights and changes state
    const select = (e) => {
        highlight(e)
        updateInfo(e.target.id)
    }

    // Updats the ability info
    const updateInfo = async (ability) => {
        dispatch(startLoading())
        await dispatch(getAbilityInfo(ability))
        dispatch(stopLoading())
    }

    // Highlight selected button
    const highlight = (e) => {
        const highlighted = e.target.classList.contains("selected")
        if (highlighted) return;
        const buttons = document.querySelectorAll(".list button");
        buttons.forEach((button) => {
            button.classList.remove('selected')
        });
        e.target.classList.toggle('selected');
    }

    // Searches through the ability list
    const search = (e) => {
        dispatch(searchAbilities(e.target.value.replace(" ", "-").toLowerCase()))
        if (e.keyCode === 13) updateInfo(document.querySelector(".list button").id)
    }


    // Render all the abilities in a list
    const renderAbilites = () => {
        return abilities.map((ability, index) => {
            const abilityName = ability.name.split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
                .join(' ');
            return (
                <button id={ability.name} key={ability.name + index} onClick={select}>
                    {abilityName.toUpperCase()}
                </button>
            )
        })
    }


    // Gets all the abilties
    useEffect(() => {
        const abortCont = new AbortController();
        dispatch(getAbilities())
        return () => abortCont.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="ability-index">
        <div className="input-field">
                <input onKeyUp={search} id="icon_prefix" type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
            </div>
            <div className="layout">
                <div className="list">
                    {renderAbilites()}
                </div>
                {abilityInfo && <AbilityInfo />}
            </div>

        </div>

    )
}

export default AbilityIndex;