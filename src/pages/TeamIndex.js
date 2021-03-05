import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation, useQuery } from 'react-apollo';
import TeamPokemonInfo from '../components/teams/TeamPokemonInfo';
import { getCookie } from '../App';
import { getTeamPokemonInfo } from '../actions';

import { addTeamMutation, getTeamsQuery, editTeamMutation, getPokemonQuery } from '../queries/teamQueries';

const TeamIndex = () => {

    const loggedIn = useSelector(state => state.loggedIn)

    // Get JWT
    const token = getCookie();

    // Redux State
    const dispatch = useDispatch();


    // Temporary States for Queries
    const [pokemonId, setPokemonId] = useState(0);
    const [teamName, setTeamName] = useState("");

    // Mutations
    const [addTeam] = useMutation(addTeamMutation);
    const [editTeam] = useMutation(editTeamMutation);

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

    const handlePokemonSelect = (id) => {
        setPokemonId(id)
        getPokemon();
    }

    const renderExistingTeams = () => {
        if (data) {
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
                        </div>
                    </div>
                )
            })
        }
    }

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
                {renderExistingTeams()}
                <button className="waves-effect waves-light btn red darken-1 add-team" onClick={addNewTeam} >Add Team</button>
            </div>
            { pokemonId && <TeamPokemonInfo />}
        </div>
    )
}

export default TeamIndex;