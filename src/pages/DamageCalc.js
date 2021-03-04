import React, { useEffect, useState } from 'react';
import { getPokemon } from '../actions';
import { pokemonOptions } from '../options/options'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const DamageCalc = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.pokemon);
    const [pokemon1, setPokemon1] = useState("");
    const [pokemon2, setPokemon2] = useState("");
    const [level1, setLevel1] = useState("1");
    const [level2, setLevel2] = useState("1");
    const [ivs1, setIVs1] = useState([0, 0, 0, 0, 0, 0]);
    const [evs1, setEVs1] = useState([0, 0, 0, 0, 0, 0]);
    const [ivs2, setIVs2] = useState([0, 0, 0, 0, 0, 0]);
    const [evs2, setEVs2] = useState([0, 0, 0, 0, 0, 0]);
    const [evCount1, setEvCount1] = useState(0)
    const [evCount2, setEvCount2] = useState(0)

    const setIVState1 = (iv, stat) => {
        const ivCopy = ivs1.slice(0);
        if (iv < 0) ivCopy[stat] = 0;
        else if (iv > 31) ivCopy[stat] = 31;
        else ivCopy[stat] = iv;
        setIVs1(ivCopy);
    }

    const setIVState2 = (iv, stat) => {
        const ivCopy = ivs2.slice(0);
        if (iv < 0) ivCopy[stat] = 0;
        else if (iv > 31) ivCopy[stat] = 31;
        else ivCopy[stat] = iv;
        setIVs2(ivCopy);
    }

    const setEVState2 = (ev, stat) => {
        const evCopy = evs2.slice(0);
        if (evCount2 - evCopy[stat] + ev > 510) evCopy[stat] = 510 - evCount2;
        else if (ev < 0) evCopy[stat] = 0;
        else if (ev > 252) evCopy[stat] = 252;
        else evCopy[stat] = ev;
        setEVs2(evCopy);
    }


    useEffect(() => {
        dispatch(getPokemon())
    }, [])

    const renderPokemon1Stats = () => {
        return (
            <>
                <ul className="point-labels">
                    <label htmlFor=""></label>
                    <label htmlFor="ivs">IVs</label>
                    <label htmlFor="evs">EVs</label>
                </ul>
                <ul className="ivs">
                    <ul className="stat-labels">
                        <label htmlFor="hp-iv">HP</label>
                        <label htmlFor="atk-iv">ATK</label>
                        <label htmlFor="def-iv">DEF</label>
                        <label htmlFor="sp-atk-iv">SP.ATK</label>
                        <label htmlFor="sp-def-iv">SP.DEF</label>
                        <label htmlFor="spd-iv">SPD</label>
                    </ul>
                    <ul className="iv-inputs">
                        <li>
                            <input type="number" name='hp-iv' value={(ivs2 && ivs2[0].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>

                            <input type="number" name='atk-iv' value={(ivs2 && ivs2[1].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 1)}
                            />
                        </li>
                        <li>

                            <input type="number" name='def-iv' value={(ivs2 && ivs2[2].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 2)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-atk-iv' value={(ivs2 && ivs2[3].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 3)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-def-iv' value={(ivs2 && ivs2[4].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 4)}
                            />
                        </li>
                        <li>

                            <input type="number" name='spd-iv' value={(ivs2 && ivs2[5].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 5)}
                            />
                        </li>
                    </ul>
                    <ul className="ev-inputs">
                        <li>
                            <input type="number" name='hp-ev' value={(evs2 && evs2[0].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>
                            <input type="number" name='atk-ev' value={(evs2 && evs2[1].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 1)} />
                        </li>
                        <li>
                            <input type="number" name='def-ev' value={(evs2 && evs2[2].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 2)} />
                        </li>
                        <li>
                            <input type="number" name='sp-atk-ev' value={(evs2 && evs2[3].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 3)} />
                        </li>
                        <li>
                            <input type="number" name='sp-def-ev' value={(evs2 && evs2[4].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 4)} />
                        </li>
                        <li>
                            <input type="number" name='spd-ev' value={(evs2 && evs2[5].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 5)} />
                        </li>
                    </ul>
                </ul>
            </>
        )
    }

    const renderPokemon2Stats = () => {
        <>
        <ul className="point-labels">
                    <label htmlFor=""></label>
                    <label htmlFor="ivs">IVs</label>
                    <label htmlFor="evs">EVs</label>
                </ul>
                <ul className="ivs">
                    <ul className="stat-labels">
                        <label htmlFor="hp-iv">HP</label>
                        <label htmlFor="atk-iv">ATK</label>
                        <label htmlFor="def-iv">DEF</label>
                        <label htmlFor="sp-atk-iv">SP.ATK</label>
                        <label htmlFor="sp-def-iv">SP.DEF</label>
                        <label htmlFor="spd-iv">SPD</label>
                    </ul>
                    <ul className="iv-inputs">
                        <li>
                            <input type="number" name='hp-iv' value={(ivs2 && ivs2[0].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>

                            <input type="number" name='atk-iv' value={(ivs2 && ivs2[1].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 1)}
                            />
                        </li>
                        <li>

                            <input type="number" name='def-iv' value={(ivs2 && ivs2[2].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 2)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-atk-iv' value={(ivs2 && ivs2[3].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 3)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-def-iv' value={(ivs2 && ivs2[4].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 4)}
                            />
                        </li>
                        <li>

                            <input type="number" name='spd-iv' value={(ivs2 && ivs2[5].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 5)}
                            />
                        </li>
                    </ul>
                    <ul className="ev-inputs">
                        <li>
                            <input type="number" name='hp-ev' value={(evs2 && evs2[0].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>
                            <input type="number" name='atk-ev' value={(evs2 && evs2[1].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 1)} />
                        </li>
                        <li>
                            <input type="number" name='def-ev' value={(evs2 && evs2[2].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 2)} />
                        </li>
                        <li>
                            <input type="number" name='sp-atk-ev' value={(evs2 && evs2[3].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 3)} />
                        </li>
                        <li>
                            <input type="number" name='sp-def-ev' value={(evs2 && evs2[4].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 4)} />
                        </li>
                        <li>
                            <input type="number" name='spd-ev' value={(evs2 && evs2[5].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 5)} />
                        </li>
                    </ul>
                </ul>
        </>
    }

    return (
        <div className="damage-calc-page">
            <div className="set-damage-vars">
                <h3>Pokemon 1</h3>
                <label htmlFor="name">Pokemon</label>
                <Select
                    options={pokemonOptions(pokemonList)}
                    value={{ value: pokemon1 || '', label: (pokemon1 && pokemon1.toUpperCase()) || '' }}
                    onChange={(option) => setPokemon1(option.value)}
                    className='pokemon-select'
                    isSearchable
                />
                <label htmlFor="level-input">Level</label>
                <input className="level-input" name="level-input" type="number" min='1' max='100' value={level1 || ""}
                    onChange={(e) => setLevel1(e.target.value)}
                    onBlur={() => (level1 < 1 && setLevel1("1")) || (level1 > 100 && setLevel1("100"))}
                />
                {renderPokemon1Stats()}
            </div>
            <div className="set-damage-vars">
                <h3>Pokemon 2</h3>
                <label htmlFor="name">Pokemon</label>
                <Select
                    options={pokemonOptions(pokemonList)}
                    value={{ value: pokemon2 || '', label: (pokemon2 && pokemon2.toUpperCase()) || '' }}
                    onChange={(option) => setPokemon2(option.value)}
                    className='pokemon-select'
                    isSearchable
                />
                <label htmlFor="level-input">Level</label>
                <input className="level-input" name="level-input" type="number" min='1' max='100' value={level2 || ""}
                    onChange={(e) => setLevel2(e.target.value)}
                    onBlur={() => (level2 < 1 && setLevel2("1")) || (level2 > 100 && setLevel2("100"))}
                />
                <ul className="point-labels">
                    <label htmlFor=""></label>
                    <label htmlFor="ivs">IVs</label>
                    <label htmlFor="evs">EVs</label>
                </ul>
                <ul className="ivs">
                    <ul className="stat-labels">
                        <label htmlFor="hp-iv">HP</label>
                        <label htmlFor="atk-iv">ATK</label>
                        <label htmlFor="def-iv">DEF</label>
                        <label htmlFor="sp-atk-iv">SP.ATK</label>
                        <label htmlFor="sp-def-iv">SP.DEF</label>
                        <label htmlFor="spd-iv">SPD</label>
                    </ul>
                    <ul className="iv-inputs">
                        <li>
                            <input type="number" name='hp-iv' value={(ivs2 && ivs2[0].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>

                            <input type="number" name='atk-iv' value={(ivs2 && ivs2[1].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 1)}
                            />
                        </li>
                        <li>

                            <input type="number" name='def-iv' value={(ivs2 && ivs2[2].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 2)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-atk-iv' value={(ivs2 && ivs2[3].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 3)}
                            />
                        </li>
                        <li>

                            <input type="number" name='sp-def-iv' value={(ivs2 && ivs2[4].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 4)}
                            />
                        </li>
                        <li>

                            <input type="number" name='spd-iv' value={(ivs2 && ivs2[5].toString()) || 0} className="mod-input" min='0' max='31'
                                onChange={(e) => setIVState2(Number(e.target.value), 5)}
                            />
                        </li>
                    </ul>
                    <ul className="ev-inputs">
                        <li>
                            <input type="number" name='hp-ev' value={(evs2 && evs2[0].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 0)}
                            />
                        </li>
                        <li>
                            <input type="number" name='atk-ev' value={(evs2 && evs2[1].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 1)} />
                        </li>
                        <li>
                            <input type="number" name='def-ev' value={(evs2 && evs2[2].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 2)} />
                        </li>
                        <li>
                            <input type="number" name='sp-atk-ev' value={(evs2 && evs2[3].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 3)} />
                        </li>
                        <li>
                            <input type="number" name='sp-def-ev' value={(evs2 && evs2[4].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 4)} />
                        </li>
                        <li>
                            <input type="number" name='spd-ev' value={(evs2 && evs2[5].toString()) || 0} className="mod-input" min='0' max='252'
                                onChange={(e) => setEVState2(Number(e.target.value), 5)} />
                        </li>
                    </ul>
                </ul>
            </div>
            <div className="set-damage-vars">
                <h3>Field Effects</h3>
            </div>
        </div>
    )
}

export default DamageCalc;