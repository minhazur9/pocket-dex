import { natures } from '../options/options';

// Calculate HP Stat
export const calculateHP = (base, iv, ev, level) => {
    return Math.floor((((2 * base + iv + (ev / 4)) * Number(level)) / 100) + Number(level) + 10);
}

// Determines the modifier of the stat depending on the nature
const getNatureModifier = (nature, statId) => {
    let natureMod = 1;
    const natureId = natures.indexOf(nature)
    const col = natureId % 5
    const row = Math.floor(natureId/5)
    if (statId === row) natureMod += 0.1;
    if (statId === col) natureMod -= 0.1;
    return natureMod
}

// Calculates all other stats
export const calculateOtherStats = (baseStats, ivs, evs, level, nature) => {
    const otherStats = [];
    for (let i = 1; i < baseStats.length; i++) {
        const natureMod = getNatureModifier(nature, i - 1);
        otherStats.push(Math.floor(((((2 * baseStats[i].base_stat + ivs[i] + (evs[i] / 4)) * Number(level)) / 100) + 5) * natureMod ))
    }
    return otherStats;
}


