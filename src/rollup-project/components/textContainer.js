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

export const createInput = (
     type = "text",
) => {

}


export const createTextArea = (
    id=null, label = false, rows=10, required=true
) => {

}




export default paragraphContainer;