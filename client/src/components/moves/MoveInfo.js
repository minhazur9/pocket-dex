import React from 'react';
import { useSelector } from 'react-redux';
import { renderLoading } from '../Loading';
import bug from '../../images/types/bug.png';
import dark from '../../images/types/dark.png';
import dragon from '../../images/types/dragon.png';
import electric from '../../images/types/electric.png';
import fairy from '../../images/types/fairy.png';
import fighting from '../../images/types/fighting.png';
import fire from '../../images/types/fire.png';
import flying from '../../images/types/flying.png';
import ghost from '../../images/types/ghost.png';
import grass from '../../images/types/grass.png';
import ground from '../../images/types/ground.png';
import ice from '../../images/types/ice.png';
import normal from '../../images/types/normal.png';
import poison from '../../images/types/poison.png';
import psychic from '../../images/types/psychic.png';
import rock from '../../images/types/rock.png';
import steel from '../../images/types/steel.png';
import water from '../../images/types/water.png';
import shadow from '../../images/types/shadow.png';
import physical from '../../images/damage_classes/physical.png';
import special from '../../images/damage_classes/special.png';
import status from '../../images/damage_classes/status.png';

const MoveInfo = () => {
    const moveInfo = useSelector((state => state.moveInfo))
    const loading = useSelector((state => state.loading))

    // Hash table for converting pokemon type strings to image
    const typeTable = {
        bug: bug,
        dark: dark,
        dragon: dragon,
        electric: electric,
        fairy: fairy,
        fighting: fighting,
        fire: fire,
        flying: flying,
        ghost: ghost,
        grass: grass,
        ground: ground,
        ice: ice,
        normal: normal,
        poison: poison,
        psychic: psychic,
        rock: rock,
        steel: steel,
        water: water,
        shadow: shadow
    }

    const damageClassTable = {
        physical: physical,
        special: special,
        status: status
    }

    // Renders the type of move
    const renderType = () => {
        const type = moveInfo.type;
        return (
            <img src={typeTable[type.name]} alt={type.name} className="type" />
        )
    }

    // Render the damage class of the move
    const renderDamageClass = () => {
        const { damageClass } = moveInfo
        if (damageClass) {
            return (
                <img src={damageClassTable[damageClass.name]} alt={damageClass.name} className="damage-class" />
            )
        }
    }

    // Renders the PP of the move
    const renderPP = () => {
        const pp = moveInfo.pp;
        if (pp === 1) return <p className="pp">Z-Move</p>
        return (
            <p className="pp">PP:{pp}</p>
        )
    }

    // Renders the power of the move
    const renderMovePower = () => {
        const power = moveInfo.power ? moveInfo.power : '---';
        return (
            <p className="move-power">Power:{power}</p>
        )
    }

    // Renders the accuracy of the move
    const renderMoveAccuracy = () => {
        const accuracy = moveInfo.accuracy ? moveInfo.accuracy + '%' : '---';
        return (
            <p className="move-accuracy">Accuracy:{accuracy}</p>
        )
    }

    // Renders the move priority
    const renderPriority = () => {
        const priority = moveInfo.priority;
        return (
            <p className="effect-chance">Priority:{priority}</p>
        )
    }

    // Renders the most up-to-date flavor text
    const renderMoveText = () => {
        const text = moveInfo.flavor_text_entries;
        let chosenText = '';
        text.forEach((flavor) => {
            if (flavor.language.name === 'en') chosenText = flavor.flavor_text
        });
        return (
            <>
                <p className="move-text">{chosenText}</p>
            </>
        )
    }

    // Renders the most up-to-date details
    const renderMoveDetails = () => {
        const details = moveInfo.effect_entries;
        let chosenText = '';
        details.forEach((entry) => {
            if (entry.language.name === 'en') chosenText = entry.effect;
        });
        chosenText = chosenText.replace("$effect_chance%", moveInfo.effect_chance + '%')
        return (
            <>
                <p className="move-text">{chosenText}</p>
            </>
        )
    }

    // Renders all the info
    const renderAllInfo = () => {
        return (
            <>
                <div className="banner">
                    <div className="left-rect"></div>
                    <h1 className="name">{moveInfo.name.toUpperCase().replace('-', ' ')}</h1>
                    <div className="right-rect"></div>
                </div>
                <div className="col2">
                    {renderType()}
                    {renderDamageClass()}
                    {renderPP()}
                </div>
                <div className="col3">
                    {renderMovePower()}
                    {renderMoveAccuracy()}
                    {renderPriority()}
                </div>
                <div className="col4">
                    {renderMoveText()}
                </div>
                <div className="col5">
                    Effect
            </div>
                <div className="col6">
                    {renderMoveDetails()}
                </div>
            </>
        )
    }

    return (
        <div className="move-info">
            {loading ? renderLoading() : renderAllInfo()}
        </div>
    )
}

export default MoveInfo;