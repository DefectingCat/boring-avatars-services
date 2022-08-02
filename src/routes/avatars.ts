import Avatar from 'boring-avatars';
import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import sharp from 'sharp';
import {
    generateString,
    normalizeColors,
    randomColors,
    randomIntFromInterval,
} from '../utils';

const router = Router();

// const DEFAULT_COLORS = [
//     '#92A1C6',
//     '#146A7C',
//     '#F0AB3D',
//     '#C271B4',
//     '#C20D90',
// ].join(',');
const DEFAULT_SIZE = 80;
// const DEFAULT_VARIANT: Variant = 'beam';

type Variant = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
const VALID_VARIANTS: [Variant, Variant, Variant, Variant, Variant, Variant] = [
    'marble',
    'beam',
    'pixel',
    'sunset',
    'ring',
    'bauhaus',
];

router.get('/img/:variant?/:size?/:name?', async (req, res) => {
    const defaultVariant = VALID_VARIANTS[randomIntFromInterval(0, 5)];
    const { variant = defaultVariant, size = DEFAULT_SIZE } = req.params;
    const name = req.query.name || req.params.name || generateString(24);

    const defaultColors = Array.from({ length: 6 }, randomColors).join(',');
    const colors = normalizeColors(
        req.query.colors?.toString() || defaultColors
    );
    const square = req.query.hasOwnProperty('square');

    if (!VALID_VARIANTS.includes(variant as Variant)) {
        return res.status(400).send('Invalid variant');
    }

    res.setHeader('Content-Type', 'image/png');
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
    const img = await sharp(Buffer.from(svg)).toBuffer();

    res.end(img);
});

router.get('/:variant?/:size?/:name?', (req, res) => {
    const defaultVariant = VALID_VARIANTS[randomIntFromInterval(0, 5)];
    const { variant = defaultVariant, size = DEFAULT_SIZE } = req.params;
    const name = req.query.name || req.params.name || generateString(24);

    const defaultColors = Array.from({ length: 6 }, randomColors).join(',');
    const colors = normalizeColors(
        req.query.colors?.toString() || defaultColors
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
