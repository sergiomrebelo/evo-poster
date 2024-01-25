import {harmony, analogue, complement, triad} from 'simpler-color';
import * as config from '../../../evo-poster.config.js';

const MIN_CONTRAST = config["default"].color !== null ? config["default"].color.MIN_CONTRAST : 10;

export const randomScheme = () => {
    const baseColour = randomColour();
    return complementAndAnalogueScheme(baseColour);
}

export const contrastChecker = (baseColor, colorA, colorB) => {
    const baseColorLuminance = luminance(baseColor);
    const colorALuminance = luminance(colorA);
    const colorBLuminance = luminance(colorB);
    const min = Math.min(contrastRatio(baseColorLuminance, colorALuminance), contrastRatio(baseColorLuminance, colorBLuminance));
    return min > MIN_CONTRAST;
}

export const complementAndAnalogueScheme = (baseColour) => {
    const colorA = complement(baseColour, 1);

    const colorB = analogue(colorA, Math.round(-2+(Math.random()*4)));
    return {
        baseColour: baseColour,
        colorA: colorA,
        colorB: colorB
    }
}


export const complementAndTriadScheme = (baseColour) => {
    const colorA = complement(baseColour, 1);
    const colorB = triad(colorA, Math.round(1+Math.random()));
    return {
        baseColour: baseColour,
        colorA: colorA,
        colorB: colorB
    }
}

export const triadScheme = (baseColour) => {
    const colorA = triad(baseColour, 1);
    const colorB = triad(baseColour, 2);

    return {
        baseColour: baseColour,
        colorA: colorA,
        colorB: colorB
    }
}

export const harmonyScheme = (baseColour) => {
    const res = harmony(baseColour);
    return {
        baseColour: baseColour,
        colorA: res.accent,
        colorB: res.secondary,
        colorC: res.neutral,
        colorD: res.error,
    }
}

export const randomColour = () => {
    let color = [Math.round(Math.random()*255), Math.round(Math.random()*255), Math.round(Math.random()*255)];
    const hex = color.map ((v) => v.toString(16).padStart(2, '0'));
    return `#${hex.join("")}`;
}



const hexToRGB = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const luminance = (c) => {
    c = hexToRGB(c);
    let [lumR, lumG, lumB] = Object.keys(c).map(key => {
        let proportion = c[key] / 255;
        return proportion <= 0.03928
            ? proportion / 12.92
            : Math.pow((proportion + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * lumR + 0.7152 * lumG + 0.0722 * lumB;
}

const contrastRatio = (luminance1, luminance2) => {
    let lighterLum = Math.max(luminance1, luminance2);
    let darkerLum = Math.min(luminance1, luminance2);

    return (lighterLum + 0.05) / (darkerLum + 0.05);
}


export default randomScheme;