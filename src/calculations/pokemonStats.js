// Calculate pokemon stats after all modifiers like level and nature

export const calculateHP = (base, iv, ev, level) => {
    return (((2 * base + iv + (ev / 4)) * level) / 100) + level + 10;
}
