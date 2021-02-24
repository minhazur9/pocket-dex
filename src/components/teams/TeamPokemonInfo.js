import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-apollo';
import Select from 'react-select';
import { getPokemon, getItems, getInfo } from '../../actions';
import { editPokemonMutation, getTeamsQuery, getPokemonQuery } from '../../queries/teamQueries';
import StatChart from '../pokemon/StatChart';
import { getCookie } from '../../App';



export const natures = [
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
    const [moveset, setMoveset] = useState([]);
    const [ivs, setIVs] = useState([0, 0, 0, 0, 0, 0]);
    const [evs, setEVs] = useState([0, 0, 0, 0, 0, 0]);
    const [editPokemon] = useMutation(editPokemonMutation);

    const natureOptions = () => {
        return natures.map((nature) => {
            return { value: nature, label: nature.toUpperCase() }
        })
    }

    useEffect(() => {
        const { name, level, nature, item, moveset, ivs, evs } = teamPokemonInfo;
        dispatch(getPokemon())
        if (name) dispatch(getInfo(name))
        dispatch(getItems())
        setPokemon(name)
        setLevel(level)
        setNature(nature)
        setItem(item)
        setMoveset(moveset)
        setIVs(ivs)
        setEVs(evs)
        // eslint-disable-next-line
    }, [teamPokemonInfo])

    useEffect(() => {
        if (pokemon) dispatch(getInfo(pokemon))
        // eslint-disable-next-line
    }, [pokemon])

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id } = teamPokemonInfo;
        editPokemon({
            variables: {
                name: pokemon,
                level: Number(level),
                nature,
                item,
                moveset,
                ivs,
                evs,
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

    const setIVState = (e, stat) => {
        const ivCopy = ivs.slice(0);
        ivCopy[stat] = Number(e.target.value) || 0;
        setIVs(ivCopy)
    }

    const setEVState = (e, stat) => {
        const evCopy = evs.slice(0);
        evCopy[stat] = Number(e.target.value) || 0;
        setEVs(evCopy)
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
                <label htmlFor="level-input">Level</label>
                <input className="level-input" name="level-input" type="number" min='1' max='100' value={level || ""}
                    onChange={(e) => setLevel(e.target.value)}
                    onBlur={() => (level < 1 && setLevel("1")) || (level > 100 && setLevel("100"))}
                />
                <p className="stat-header">IVs</p>
                <ul className="ivs">
                    <li>
                        <label htmlFor="hp-iv">HP</label>
                        <input type="number" name='hp-iv' value={(ivs && ivs[0]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 0)} />
                    </li>
                    <li>
                        <label htmlFor="atk-iv">ATK</label>
                        <input type="number" name='atk-iv' value={(ivs && ivs[1]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 1)} />
                    </li>
                    <li>
                        <label htmlFor="def-iv">DEF</label>
                        <input type="number" name='def-iv' value={(ivs && ivs[2]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 2)} />
                    </li>
                    <li>
                        <label htmlFor="sp-atk-iv">SP.ATK</label>
                        <input type="number" name='sp-atk-iv' value={(ivs && ivs[3]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 3)} />
                    </li>
                    <li>
                        <label htmlFor="sp-def-iv">DEF.ATK</label>
                        <input type="number" name='sp-def-iv' value={(ivs && ivs[4]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 4)} />
                    </li>
                    <li>
                        <label htmlFor="spd-iv">SPD</label>
                        <input type="number" name='spd-iv' value={(ivs && ivs[5]) || 0} className="mod-input" min='0' max='31'
                            onChange={(e) => setIVState(e, 5)} />
                    </li>
                </ul>
                <p className="stat-header">EVs</p>
                <ul className="ivs">
                    <li>
                        <label htmlFor="hp-iev">HP</label>
                        <input type="number" name='hp-ev' value={(evs && evs[0]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 0)} />
                    </li>
                    <li>
                        <label htmlFor="atk-iev">ATK</label>
                        <input type="number" name='atk-ev' value={(evs && evs[1]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 1)} />
                    </li>
                    <li>
                        <label htmlFor="def-ev">DEF</label>
                        <input type="number" name='def-ev' value={(evs && evs[2]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 2)} />
                    </li>
                    <li>
                        <label htmlFor="sp-atk-ev">SP.ATK</label>
                        <input type="number" name='sp-atk-ev' value={(evs && evs[3]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 3)} />
                    </li>
                    <li>
                        <label htmlFor="sp-def-ev">DEF.ATK</label>
                        <input type="number" name='sp-def-ev' value={(evs && evs[4]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 4)} />
                    </li>
                    <li>
                        <label htmlFor="spd-ev">SPD</label>
                        <input type="number" name='spd-ev' value={(evs && evs[5]) || 0} className="mod-input" min='0' max='252'
                            onChange={(e) => setEVState(e, 5)} />
                    </li>
                </ul>
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
                {info && pokemon && <StatChart height={250} width={350} level={level} ivs={ivs} evs={evs} nature={nature} />}
                <button className="waves-effect waves-light btn green darken-3 confirm-edit">Confirm</button>
            </form>
        </div>
    )

}

export default TeamPokemonInfo;