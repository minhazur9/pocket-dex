import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const EvolutionChain = () => {
    const evolutionChain = useSelector(state => state.evolutionChain);

    const renderChain = (branch) => {
        return branch.chain.evolves_to.map((form) => {
            console.log(form)
            if(branch.chain.evolves_to === []) return;
            return renderChain(form)
        }
            
        )
    }

    useEffect(() => {
        renderChain(evolutionChain)
    },[])

    return (
        <>
        {renderChain(evolutionChain)}
        </>
    )
}

export default EvolutionChain;