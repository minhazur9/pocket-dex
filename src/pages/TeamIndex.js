import React, { useState } from 'react';
import {useMutation,useQuery} from 'react-apollo';
import TeamPokemonInfo from '../components/teams/TeamPokemonInfo';

import {addTeamMutation} from '../queries/teamQueries';

const TeamIndex = () => {

    // const {data} = useQuery()

    const [addPokemon, setAddPokemon] = useState(0)

    const [addTeam] = useMutation(addTeamMutation)

    const renderInfo = (e) => {

    }

    const renderTeam = () => {
        return Array.from(Array(addPokemon), (num, index) => {
            return (
                <div key={num + index} className="team-container">
                    <h3>Add Team</h3>
                    <div className="team-pokemon">
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                        <div className="add-pokemon empty" onClick={renderInfo}>+</div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="team-index">
            <div className="teams">
                <h1>My Teams</h1>
                {renderTeam()}
                <button className="waves-effect waves-light btn red darken-1 add-team" onClick={() => setAddPokemon(addPokemon + 1)}>Add Team</button>
            </div>
            <TeamPokemonInfo />
        </div>
    )
}

export default TeamIndex;