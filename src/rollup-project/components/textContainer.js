export const paragraphContainer = (
    info = [], title= null, classes = [], id = null
) => {
    const container = document.createElement("div");

    if (title !== null) {
        const titleContainer = headline("h3", title, ["d-inline"]);
        container.appendChild(titleContainer);
    }

    const p = document.createElement("p");

    for (let c of classes) {
        p.classList.add(c);
    }

    if (id !== null) {
        p.id = id;
    }

    container.appendChild(p);
    return container;
}

export const headline = (
    type = "h3", text, classes = [], id = null
) => {
    const headline = document.createElement(type);
    for (let c of classes) {
        headline.classList.add(c);
    }
    if (id !== null) headline.id = id;
    headline.textContent = text;
    return headline;
}

export const container = (
    type = "div", classes = [], id = null
) => {
    const container = document.createElement(type)
    for (let c of classes) {
        container.classList.add(c);
    }
    if (id !== null) container.id = id;

    return container;
};

export const input = (
     type = "text", value = null, classes = [], id = null, checked = null, name = null
) => {
    const input = document.createElement(`input`);
    input.type = type;
    if (value !== null) input.value = value;
    for (let c of classes) {
        input.classList.add(c);
    }
    if (id !== null) input.id = id;
    if (checked !== null) input.checked = checked;
    if (name !== null) input.name = name;
    return input;
}


export const button = (
    textContent, classes = [], type = null, id = null
) => {
    const bt = document.createElement(`button`);
    if (type !== null) bt.type = type;
    if (id !== null) bt.id = id;
    for (let c of classes) {
        bt.classList.add(c);
    }
    bt.textContent = textContent
    return bt;
}


export default paragraphContainer;