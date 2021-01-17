import { render } from '@testing-library/react';
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
                       return;
                    })
            }
    }

    const renderChain = () => {
        getEvolutionData(evolutionChain);
        return evolutionData.map((stage) => {
            return (
                <h3>{stage}</h3>
            )
        })
    }

    useEffect(() => {
        dispatch(getEvolutionChain(speciesInfo.evolution_chain.url))
    },[])

    return (
        <>
        {renderChain()}
        </>
    )
}

export default EvolutionChain;