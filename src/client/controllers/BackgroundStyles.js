export default {
    solid: (pg, color) => {
        pg.background(color);
    },
    gradient: (pg, colorA, colorB) => {
        push();
        const ctx = pg.drawingContext;
        pg.background(colorA);
        let gradientHeight = pg.height;
        const gradient = ctx.createLinearGradient(0, 0, 0, gradientHeight);
        gradient.addColorStop(0.0, colorA);
        gradient.addColorStop(0.25, colorA);
        gradient.addColorStop(0.75, colorB);
        gradient.addColorStop(1, colorB);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0, pg.width, gradientHeight);
        pop();
    },
    triangle: (pg, colorA, colorB) => {
        push();
        pg.background(colorA);
        pg.noStroke();
        pg.fill(colorB);
        pg.triangle(
            0, 0,
            0, pg.height,
            pg.width, pg.height
        );
        pop();
    }
}