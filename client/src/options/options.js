// list of pokemon natures
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

// renders all pokemon
export const pokemonOptions = (list) => {
    return list.map((pokemon) => {
        const { name } = pokemon;
        return { value: name, label: name.toUpperCase() }
    })
}

// render all items
export const itemOptions = (list) => {
    return list.map((item) => {
        const { name } = item;
        return { value: name, label: name.toUpperCase() }
    })
}

// renders all moves
export const moveOptions = (info) => {
    const { moves } = info;
    return moves.map((entry) => {
        const { name } = entry.move;
        return { value: name, label: name.toUpperCase() }
    })
}

// renders all natures
export const natureOptions = () => {
    return natures.map((nature) => {
        return { value: nature, label: nature.toUpperCase() }
    })
}

// renders all abilities
export const abilityOptions = (info) => {
    let abilities = [];
    if (info) abilities = info.abilities;
    return abilities.map((entry) => {
        const { name } = entry.ability;
        return { value: name, label: name.toUpperCase() }
    })
}
