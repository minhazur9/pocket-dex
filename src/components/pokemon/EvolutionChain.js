import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getEvolutionChain,getInfo, getSpeciesInfo } from '../../actions';

const EvolutionChain = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);
    const evolutionChain = useSelector(state => state.evolutionChain);
    const dispatch = useDispatch();

    const updatePokemonState = (e,pokemonName) => {
        dispatch(getInfo(pokemonName))
        dispatch(getSpeciesInfo(pokemonName))
    }


    const renderFirstStage = (stage) => {
        if(stage) {
            return (
                <div className="chain">
                <li className="stage-image" onClick={(e) => updatePokemonState(e,stage.species.name)}>
                        <img src={`https://img.pokemondb.net/artwork/${stage.species.name}.jpg`} alt={stage}/>
                        <p>{stage.species.name.toUpperCase()}</p>
                </li>
                <div>{stage.evolves_to.length > 0 && <i className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
                </div>              
            );
        }
    }

    const renderChain = (data) => {
        if(data) {
        return data.evolves_to.map((stage,index) => {
            return (
                    <div key={index} className="chain">
                    <li className="stage-image" key={index} onClick={(e) => updatePokemonState(e,stage.species.name)}>
                            <img src={`https://img.pokemondb.net/artwork/${stage.species.name}.jpg`} alt={stage}/>
                            <p>{stage.species.name.toUpperCase()}</p>
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