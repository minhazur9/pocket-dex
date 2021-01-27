import React from 'react';
import { useSelector } from 'react-redux';

const ItemInfo = () => {
    const itemInfo = useSelector(state => state.itemInfo)
    const loading = useSelector(state => state.loading)

    let {name} = itemInfo;
    name = name.replace('-',' ').toUpperCase();

    const renderSprite = () => {
        const {sprites, name} = itemInfo;
        return (
            <img src={sprites.default} alt={name} className="item-sprite"/>
        )
    }

    const renderFlingPower = () => {
        let {fling_power} = itemInfo;
        return (
            <p className="fling-power">Fling Power:{fling_power ? fling_power : 0}</p>
        )
    }

    const renderCategory = () => {
        let {name} = itemInfo.category;
        if (name.includes('-')) name = name.replace('-',' ')
        return (
            <p className="item-category">{name.toUpperCase()}</p>
        )
    }

    const renderFlavorText = () => {
        const {flavor_text_entries} = itemInfo;
        let chosenText = '';
        flavor_text_entries.forEach((flavor) => {
            if (flavor.language.name === 'en') chosenText = flavor.text
        });
        return (
            <>
                <p className="item-text">{chosenText}</p>
            </>
        )
    }

    const renderEffectText = () => {
        const {effect_entries} = itemInfo;
        let chosenText = '';
        effect_entries.forEach((entry) => {
            if (entry.language.name === 'en') chosenText = entry.effect;
        });
        return (
            <>
                <p className="item-text">{chosenText}</p>
            </>
        )
    }

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
            <h1 className="name">{name}</h1>
            <div className="col2">
                {renderCategory()}
                {renderSprite()}
                {renderFlingPower()}
            </div>
            <div className="col3">
                {renderFlavorText()}
            </div>
            <div className="col4">
                Effect
            </div>
            <div className="col5">
                {renderEffectText()}
            </div>
        </>
        )
    }
    
    return (
        <div className="item-info">
            { loading ? renderLoading() : renderAllInfo()}
        </div>
        
    )

}

export default ItemInfo;