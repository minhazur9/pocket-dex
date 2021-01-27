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