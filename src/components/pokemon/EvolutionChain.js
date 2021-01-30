import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getEvolutionChain,getInfo, getSpeciesInfo } from '../../actions';

const EvolutionChain = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);
    const evolutionChain = useSelector(state => state.evolutionChain);
    const dispatch = useDispatch();

    // updates the pokemon info state when clicked
    const updatePokemonState = (e,pokemonName) => {
        dispatch(getInfo(pokemonName))
        dispatch(getSpeciesInfo(pokemonName))
    }

    // Formats the name for images
    const imageNameFormatter = (name) => {
        if(name === 'giratina') return 'giratina-altered';
        if(name === 'urshifu') return 'urshifu-single-strike';
        return name;
    }

    // Renders the evolution method for a pokemon
    const renderEvolutionMethod = (stage) => {
        for (const method in stage) {
            if(stage[method]) {
                if(method === 'min_level') {
                    const text = 'Level ' + stage[method]
                    return (
                        <p className="evolution_method">{text.toUpperCase()}</p>
                    )
                }
                if(method === 'min_happiness') {
                    const text = 'Happiness ' + stage[method]
                    return (
                        <p className="evolution_method">{text.toUpperCase()}</p>
                    )
                }
                if(method === 'item' || method === 'held-item') {
                    let text = stage[method].name;
                    if(text === 'held-item') text = 'Holding ' + stage[method]
                    return (
                        <p className="evolution_method">{text.toUpperCase()}</p>
                    )
                }
                if(method === 'known_move') {
                    let text = 'Learned ' + stage[method].name;
                    return (
                        <p className="evolution-method">{text.toUpperCase()}</p>
                    )
                }
                if(method === 'trigger') {
                    let text = stage[method].name;
                    return (
                        <p className="evolution-method">{text.toUpperCase()}</p>
                    )
                }
                else {
                    return (
                        <p className="evolution_method">{stage[method]}</p>
                    )
                }
                
            }
        }
    }


    // Renders the first stage of an evolution chain
    const renderFirstStage = (stage) => {
        if(stage) {
            let {name} = stage.species;
            name = imageNameFormatter(name)
            return (
                <div className="chain">
                <li className="stage-image" onClick={(e) => updatePokemonState(e,stage.species.name)}>
                        <img src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt={stage}/>
                        <p>{stage.species.name.toUpperCase()}</p>
                </li>
                <div>{stage.evolves_to.length > 0 && <i className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
                </div>              
            );
        }
    }

    // Rendes the rest of the chain
    const renderChain = (data) => {
        if(data) {
        return data.evolves_to.map((stage,index) => {
            const {evolution_details} = stage;
            let {name} = stage.species;
            name = imageNameFormatter(name);
            return (
                    <div key={index} className="chain">
                    <li className="stage-image" key={index} onClick={(e) => updatePokemonState(e,stage.species.name)}>
                            <img src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt={stage}/>
                            <p>{stage.species.name.toUpperCase()}</p>
                            {renderEvolutionMethod(evolution_details[0])}
                    </li>
                    <div key={index + 10}>{stage.evolves_to.length > 0 && <i key={index + 10} className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
                    {stage.evolves_to.length > 0 && renderChain(stage)}
                    </div>              
            );
        })}
    }

    useEffect(() => {
        dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <p className="evolution-chain-header">Evolution Chain</p>
            <ul className="evolution-line">
                {renderFirstStage(evolutionChain)}
                {renderChain(evolutionChain)}
            </ul>
        </>
    )
}

export default EvolutionChain;