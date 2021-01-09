import React from 'react';
import { useSelector } from 'react-redux';
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
        water: water
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
        const damageClass = moveInfo.damage_class;
        return (
             <img src={damageClassTable[damageClass.name]} alt={damageClass.name} className="damage-class" />
        )
    }

    // Renders the PP of the move
    const renderPP = () => {
        const pp = moveInfo.pp;
        if (pp === 1) return <p className="pp">Z-Move</p>
        return (
            <p className="pp">PP:{pp}</p>
        )
    }

    const renderMovePower = () => {
        const power = moveInfo.power ? moveInfo.power : '---';
        return (
            <p className="move-power">Power:{power}</p>
        )
    }

    const renderMoveAccuracy = () => {
        const accuracy = moveInfo.accuracy ? moveInfo.accuracy : '---';
        return (
            <p className="move-accuracy">Accuracy:{accuracy}</p>
        )
    }

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

    // Renders loading spinner
    const renderLoading = () => {
        return (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    const renderAllInfo = () => {
        return (
            <>
            <h1 className="name">{moveInfo.name.toUpperCase()}</h1>
            <div className="col2">
                {renderType()}
                {renderDamageClass()}
                {renderPP()}
            </div>
            <div className="col3">
                {renderMovePower()}
                {renderMoveAccuracy()}
                {renderMoveText()}
            </div>
            </>
        )
    }

    return (
        <div className="move-info">
            { loading && renderLoading()}
            { !loading && renderAllInfo()}
        </div>
    )
}

export default MoveInfo;