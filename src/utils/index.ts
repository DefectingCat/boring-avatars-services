export function normalizeColors(colors: string) {
    const colorPalette = colors.split(',');

    if (colorPalette.length) {
        return colorPalette.map((color) =>
            color.startsWith('#') ? color : `#${color}`
        );
    }
}

export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
