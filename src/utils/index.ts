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

export function randomColors() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*_';

export function generateString(length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            randomIntFromInterval(0, charactersLength - 1)
        );
    }

    return result;
}
