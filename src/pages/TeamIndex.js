import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import TeamPokemonInfo from '../components/teams/TeamPokemonInfo';
import { getCookie } from '../App';

import { addTeamMutation, getTeamsQuery, editTeamMutation } from '../queries/teamQueries';

const TeamIndex = () => {

    const token = getCookie();
    const [addButtonClicked, setAddButtonClicked] = useState(false);
    const [pokemonClicked, setPokemonClicked] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [addTeam] = useMutation(addTeamMutation);
    const [editTeam] = useMutation(editTeamMutation);
    const { data } = useQuery(getTeamsQuery, {
        variables: {
            userId: token
        }
    });

    const renderExistingTeams = () => {
        if (data) {
            const { allTeamsByUser } = data;
            return allTeamsByUser.map((team) => {
                const { name, id } = team;
                return (
                    <div id={id} key={name} className="team-container">
                        <input className="team-name" defaultValue={name}
                            onFocus={(e) => setTeamName(e.target.value)}
                            onChange={(e) => setTeamName(e.target.value)}
                            onBlur={editTeamInfo}
                        />
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
            })
        }
    }

    const editTeamInfo = (e) => {
        const id = e.target.parentElement.id;
        console.log(id)
        editTeam({
            variables: {
                id,
                name: teamName
            },
            // refetchQueries: [{ query: getTeamsQuery }]
        })
    }


    const addNewTeam = () => {
        const defaultName = `Team ${document.querySelectorAll('.team-container').length + 1}`
        const name = defaultName
        addTeam({
            variables: {
                name,
                userId: token
            },
            // refetchQueries: [{ query: getTeamsQuery }]
        })
        setAddButtonClicked(true);
    }

    const renderNewTeam = () => {
        const defaultName = `Team ${document.querySelectorAll('.team-container').length}`
        return (
            <div className="team-container">
                <input className="team-name" placeholder={defaultName} />
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
                {renderExistingTeams()}
                {addButtonClicked && renderNewTeam()}
                <button className="waves-effect waves-light btn red darken-1 add-team" onClick={addNewTeam} >Add Team</button>
            </div>
            { pokemonClicked && <TeamPokemonInfo />}
        </div>
    )
}

export default TeamIndex;