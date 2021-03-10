import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation, useQuery } from 'react-apollo';
import TeamPokemonInfo from '../components/teams/TeamPokemonInfo';
import { getCookie } from '../App';
import { getTeamPokemonInfo } from '../actions';

import { addTeamMutation, getTeamsQuery, editTeamMutation, getPokemonQuery, deleteTeamMutation, getAllPokemonByTeamQuery } from '../queries/teamQueries';

const TeamIndex = () => {

    // Get JWT
    const token = getCookie();

    // Redux State
    const dispatch = useDispatch();


    // Temporary States for Queries
    const [pokemonId, setPokemonId] = useState(0);
    const [teamName, setTeamName] = useState("");
    const [teamId, setTeamId] = useState(0);

    // Mutations
    const [addTeam] = useMutation(addTeamMutation);
    const [editTeam] = useMutation(editTeamMutation);
    const [deleteTeam] = useMutation(deleteTeamMutation);

    // Queries
    const { data } = useQuery(getTeamsQuery, {
        variables: {
            userId: token
        }
    });

    const [getPokemon] = useLazyQuery(getPokemonQuery, {
        variables: {
            id: pokemonId
        },
        onCompleted: data => {
            const { pokemon } = data;
            dispatch(getTeamPokemonInfo(pokemon))
        }
    })

    const [getAllPokemonByTeam] = useLazyQuery(getAllPokemonByTeamQuery, {
        variables: {
            teamId: teamId
        }
    })

    const handleDeleteTeam = (e) => {
        deleteTeam({
            variables: {
                id: e.target.id
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token
                    }
                }
            ]
        })
    }

    // gets information of selected pokemon
    const handlePokemonSelect = (id) => {
        setPokemonId(id)
        getPokemon();
    }

    // renders all existing teams belonging to the user
    const renderExistingTeams = () => {
        const { allTeamsByUser } = data;
        return allTeamsByUser.map((team) => {
            const { name, id, pokemon } = team;
            return (
                <div id={id} key={name} className="team-container">
                    <input className="team-name" defaultValue={name}
                        onFocus={(e) => setTeamName(e.target.value)}
                        onChange={(e) => setTeamName(e.target.value)}
                        onBlur={editTeamInfo}
                    />
                    <div className="team-pokemon">
                        {renderPokemonList(pokemon)}
                        {allTeamsByUser.length > 1 && <button id={id} className="waves-effect waves-light btn-small red  delete-team" onClick={handleDeleteTeam}>Delete Team</button>}
                    </div>
                </div>
            )
        })
    }

    // renders all pokemon in the team
    const renderPokemonList = (pokemonList) => {
        return pokemonList.map((pokemon) => {
            const { name, id } = pokemon;
            if (name) {
                return (
                    <div key={id} className="add-pokemon">
                        <img src={`https://img.pokemondb.net/artwork/${name}.jpg`} alt={name} onClick={() => handlePokemonSelect(id)} />
                    </div>
                )
            }
            else {
                return (
                    <div key={id} className="add-pokemon" onClick={() => handlePokemonSelect(id)}>
                        +
                    </div>
                )
            }
        })
    }

    // edits the team info in the database
    const editTeamInfo = (e) => {
        const id = e.target.parentElement.id;
        editTeam({
            variables: {
                id,
                name: teamName
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token
                    }
                }
            ]
        })
    }


    // adds a new team in the database
    const addNewTeam = () => {
        const defaultName = `Team ${document.querySelectorAll('.team-container').length + 1}`
        const name = defaultName
        addTeam({
            variables: {
                name,
                userId: token
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token
                    }
                }
            ]
        })
    }

    return (
        <div className="team-index">
            <div className="teams">
                <h1>My Teams</h1>
                {data && renderExistingTeams()}
                <button className="waves-effect waves-light btn red darken-1 add-team" onClick={addNewTeam} >Add Team</button>
            </div>
            { pokemonId && <TeamPokemonInfo />}
        </div>
    )
}

export default TeamIndex;