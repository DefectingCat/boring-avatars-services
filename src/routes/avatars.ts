import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Avatar from 'boring-avatars';

const router = Router();

const DEFAULT_COLORS = [
    '#92A1C6',
    '#146A7C',
    '#F0AB3D',
    '#C271B4',
    '#C20D90',
].join(',');
const DEFAULT_SIZE = 80;
const DEFAULT_VARIANT: Variant = 'beam';

type Variant = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
const VALID_VARIANTS: [Variant, Variant, Variant, Variant, Variant, Variant] = [
    'marble',
    'beam',
    'pixel',
    'sunset',
    'ring',
    'bauhaus',
];

function normalizeColors(colors: string) {
    const colorPalette = colors.split(',');

    if (colorPalette.length) {
        return colorPalette.map((color) =>
            color.startsWith('#') ? color : `#${color}`
        );
    }
}

router.get('/:variant?/:size?/:name?', (req, res) => {
    const { variant = DEFAULT_VARIANT, size = DEFAULT_SIZE } = req.params;
    const name = req.query.name || req.params.name || Math.random().toString();
    const colors = normalizeColors(
        req.query.colors?.toString() || DEFAULT_COLORS
    );
    const square = req.query.hasOwnProperty('square');

    if (!VALID_VARIANTS.includes(variant as Variant)) {
        return res.status(400).send('Invalid variant');
    }

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    const svg = renderToString(
        React.createElement(
            Avatar,
            {
                size,
                name: name.toString(),
                variant: variant as Variant,
                colors,
                square,
            },
            null
        )
    );

    res.end(svg);
});

export default router;
