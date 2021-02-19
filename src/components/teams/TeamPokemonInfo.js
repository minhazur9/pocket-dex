import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import Select from 'react-select';
import { getPokemon, getItems, getInfo } from '../../actions';
import { editPokemonMutation, getTeamsQuery, getPokemonQuery } from '../../queries/teamQueries';
import StatChart from '../pokemon/StatChart';
import { getCookie } from '../../App';

// General Pokemon Information
const TeamPokemonInfo = () => {
    const token = getCookie();
    const dispatch = useDispatch();
    const teamPokemonInfo = useSelector(state => state.teamPokemonInfo);
    const pokemonList = useSelector(state => state.pokemon);
    const itemList = useSelector(state => state.items);
    const info = useSelector(state => state.info);
    const [pokemon, setPokemon] = useState('');
    const [level, setLevel] = useState('1');
    const [nature, setNature] = useState('hardy');
    const [item, setItem] = useState('');
    const [moveset, setMoveset] = useState([])
    const [editPokemon] = useMutation(editPokemonMutation);

    const natures = [
        'hardy',
        'lonely',
        'adamant',
        'naughty',
        'brave',
        'bold',
        'docile',
        'impish',
        'lax',
        'relaxed',
        'modest',
        'mild',
        'bashful',
        'rash',
        'quiet',
        'calm',
        'gentle',
        'careful',
        'quirky',
        'sassy',
        'timid',
        'hasty',
        'jolly',
        'naive',
        'serious'
    ]

    const natureOptions = () => {
        return natures.map((nature) => {
            return { value: nature, label: nature.toUpperCase() }
        })
    }

    useEffect(() => {
        const { name, level, nature, item, moveset } = teamPokemonInfo;
        dispatch(getPokemon())
        if (name) dispatch(getInfo(name))
        dispatch(getItems())
        setPokemon(name)
        setLevel(level)
        setNature(nature)
        setItem(item)
        setMoveset(moveset)
        // eslint-disable-next-line
    }, [teamPokemonInfo])

    useEffect(() => {
        if (pokemon) dispatch(getInfo(pokemon))
        // eslint-disable-next-line
    }, [pokemon])



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(moveset)
        const { id } = teamPokemonInfo;
        editPokemon({
            variables: {
                name: pokemon,
                level: Number(level),
                nature,
                item,
                moveset,
                id,
            },
            refetchQueries: [
                {
                    query: getTeamsQuery,
                    variables: {
                        userId: token,
                    }
                },
                {
                    query: getPokemonQuery,
                    variables: {
                        id
                    }
                }
            ]
        })
    }

    const pokemonOptions = () => {
        return pokemonList.map((pokemon) => {
            const { name } = pokemon;
            return { value: name, label: name.toUpperCase() }
        })
    }

    const itemOptions = () => {
        return itemList.map((item) => {
            const { name } = item;
            return { value: name, label: name.toUpperCase() }
        })
    }

    const moveOptions = () => {
        const { moves } = info;
        return moves.map((entry) => {
            const { name } = entry.move;
            return { value: name, label: name.toUpperCase() }
        })

    }

    const handleMovesetChange = (option) => {
        if (option.length > 4) option.pop();
        setMoveset(option.map((option) => option.value))
    }

    const presetMoveset = () => {
        return moveset.map((move) => {
            return { value: move, label: move.toUpperCase() }
        })
    }

    const levelVerificationError = () => {
        if (Number(level) < 1 || Number(level) > 100) {
            return <p className="error-message">Invalid Level</p>
        }
    }


    return (
        <div className="team-pokemon-info">
            <form onSubmit={handleSubmit}>
                <label htmlFor="pokemon-select">Pokemon</label>
                <Select
                    options={pokemonOptions()}
                    value={{ value: pokemon || '', label: (pokemon && pokemon.toUpperCase()) || '' }}
                    onChange={(option) => setPokemon(option.value)}
                    className='pokemon-select'
                    isSearchable
                />
                <label htmlFor="level">Level</label>
                <input type="number" min='1' max='100' value={level || ''}
                    onChange={(e) => setLevel(e.target.value)}
                    onBlur={() => (level < 1 && setLevel("1")) || (level > 100 && setLevel("100"))}
                />
                {levelVerificationError()}
                <label htmlFor="nature-select">Nature</label>
                <Select
                    options={natureOptions()}
                    value={{ value: nature || '', label: (nature && nature.toUpperCase()) || '' }}
                    onChange={(option) => setNature(option.value)}
                    isSearchable
                    className='nature-select'
                />
                <label className='item-select-label' htmlFor="item-select">Held Item</label>
                <Select
                    options={itemOptions()}
                    value={{ value: item || '', label: (item && item.toUpperCase()) || '' }}
                    onChange={(option) => setItem(option.value)}
                    className='item-select'
                /><br />
                <label htmlFor="moveset-select">Moveset</label>
                <Select
                    options={info && moveOptions()}
                    isMulti
                    isSearchable
                    value={(moveset && presetMoveset()) || ''}
                    onChange={(option) => handleMovesetChange(option)}
                />
                { pokemon && <StatChart height={250} width={350} />}
                <button className="waves-effect waves-light btn green darken-3 confirm-edit">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;