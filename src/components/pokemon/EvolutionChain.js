import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getEvolutionChain } from '../../actions';

const EvolutionChain = () => {
    const speciesInfo = useSelector(state => state.speciesInfo);
    const evolutionChain = useSelector(state => state.evolutionChain);
    const dispatch = useDispatch();

    // dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
    // const getEvolutionData = (data,branch) => {
    //         if(data) {
    //             evolutionData.push({name:data.species.name,branch:branch})
    //                 data.evolves_to.map((form) => {
    //                     console.log(data.evolves_to.indexOf(form))
    //                    return getEvolutionData(form,data.evolves_to.indexOf(form))
    //                 })
    //         }
    // }

    // const renderChain = () => {
    //     getEvolutionData(evolutionChain,0);
    //     console.log(evolutionData)
    //     return evolutionData.map((stage,index) => {
    //         return (
    //             <>
    //             <li className="stage-image" key={index}>
    //                     <img src={`https://img.pokemondb.net/artwork/${stage.name}.jpg`} alt={stage}/>
    //                     <p>{stage.name.toUpperCase()}</p>
    //             </li>
    //             <div key={index + 10}>{evolutionData[index + 1] && <i key={index + 10} className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
    //             </>
                
    //         )
    //     })
    // }

    const renderFirstStage = (stage) => {
        if(stage) {
            return (
                <>
                <li className="stage-image">
                        <img src={`https://img.pokemondb.net/artwork/${stage.species.name}.jpg`} alt={stage}/>
                        <p>{stage.species.name.toUpperCase()}</p>
                </li>
                <div>{stage.evolves_to.length > 0 && <i className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
                </>              
            );
        }
    }

    const renderChain = (data) => {
        if(data) {
        return data.evolves_to.map((stage,index) => {
            return (
                    <>
                    <li className="stage-image" key={index}>
                            <img src={`https://img.pokemondb.net/artwork/${stage.species.name}.jpg`} alt={stage}/>
                            <p>{stage.species.name.toUpperCase()}</p>
                    </li>
                    <div key={index + 10}>{stage.evolves_to.length > 0 && <i key={index + 10} className="fa fa-long-arrow-right" aria-hidden="false"></i>}</div>
                    {stage.evolves_to.length > 0 && renderChain(stage)}
                    </>              
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