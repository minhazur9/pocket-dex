import React, { useState } from 'react';
import { useQuery } from 'react-apollo'

const TeamIndex = () => {

    const [addPokemon, setAddPokemon] = useState(0)

    const renderTeam = () => {
        return Array.from(Array(addPokemon), (num,index) => {
            console.log(index)
            return (
                <div key={num,index}className="team-container">
                    <h3>Add Team</h3>
                    <div className="team-pokemon">
                        <div className="add-pokemon">+</div>
                        <div className="add-pokemon">+</div>
                        <div className="add-pokemon">+</div>
                        <div className="add-pokemon">+</div>
                        <div className="add-pokemon">+</div>
                        <div className="add-pokemon">+</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="team-index">
            <h1>My Teams</h1>
            {renderTeam()}
            <a className="waves-effect waves-light btn red darken-1 add-team" onClick={() => setAddPokemon(addPokemon + 1)}>Add Team</a>
        </div>
    )
}

export default TeamIndex;