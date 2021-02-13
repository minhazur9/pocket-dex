import React, { useState } from 'react';
import {useMutation,useQuery} from 'react-apollo';
import TeamPokemonInfo from '../components/teams/TeamPokemonInfo';
import {getCookie} from '../App';

import {addTeamMutation, getTeams} from '../queries/teamQueries';

const TeamIndex = () => {

    const token = getCookie();
    const [addButtonClicked, setAddButtonClicked] = useState(false)
    const [pokemonClicked, setPokemonClicked] = useState(false)
    const [addTeam] = useMutation(addTeamMutation)
    const {data} = useQuery(getTeams,{
        variables: {
            id: token
        }
    })
    console.log(data)

    const addNewTeam = (e) => {
        const defaultName = `Team ${document.querySelectorAll('.team-container').length + 1}`
        const name = e.target.value || defaultName
        addTeam({
            variables: {
                name,
                userId: token
            }
        })
        setAddButtonClicked(true);
    }

    const renderNewTeam = () => {
        const defaultName = `Team ${document.querySelectorAll('.team-container').length}`
            return (
                <div className="team-container">
                    <input className="team-name"placeholder={defaultName} />
                    <div className="team-pokemon">
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                        <div className="add-pokemon empty" onClick={() => setPokemonClicked(true)}>+</div>
                    </div>
                </div>
            )
    }

    return (
        <div className="team-index">
            <div className="teams">
                <h1>My Teams</h1>
                {addButtonClicked && renderNewTeam()}
                <button className="waves-effect waves-light btn red darken-1 add-team" onClick={addNewTeam} >Add Team</button>
            </div>
            { pokemonClicked && <TeamPokemonInfo/>}
        </div>
    )
}

export default TeamIndex;