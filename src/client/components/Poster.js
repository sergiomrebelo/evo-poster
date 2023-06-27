class Poster {
    constructor(id, textboxes) {
        this.id = id;
        this.textboxes = textboxes;
    }

    draw = () => {
        push();
        fill(255,255,0);
        rect(width/2, height/2, 50, 50);
        pop();
    }
}

export default Poster;