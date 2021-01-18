import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getEvolutionChain } from '../../actions';

const EvolutionChain = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);
    const evolutionChain = useSelector(state => state.evolutionChain);
    const evolutionData = [];
    const dispatch = useDispatch();

    // dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
    const getEvolutionData = (data) => {
            if(data) {
                evolutionData.push(data.species.name)
                    data.evolves_to.map((form) => {
                       if(form.evolves_to) return getEvolutionData(form)
                       return 0;
                    })
            }
    }

    const renderChain = () => {
        getEvolutionData(evolutionChain);
        return evolutionData.map((stage,index) => {
            return (
                <>
                <li className="stage-image" key={index}>
                        <img src={`https://img.pokemondb.net/artwork/${stage}.jpg`} alt={stage}/>
                        <p>{stage.toUpperCase()}</p>
                </li>
                {evolutionData[index + 1] && <i key={index + 10} className="fa fa-long-arrow-right" aria-hidden="false"></i>}
                </>
                
            )
        })
    }

    useEffect(() => {
        dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <p className="evolution-chain-header">Evolution Chain</p>
            <ul className="evolution-line">
                {renderChain()}
            </ul>
        </>
    )
}

export default EvolutionChain;