import {harmony, analogue, complement, triad } from 'simpler-color';

export const randomScheme = () => {
    const baseColour = randomColour();
    return complementAndAnalogueScheme(baseColour);
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


export default randomScheme;