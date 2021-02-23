// Calculate pokemon stats after all modifiers like level and nature

export const calculateHP = (base, iv, ev, level) => {
    return Math.floor((((2 * base + iv + (ev / 4)) * Number(level)) / 100) + Number(level) + 10);
}
