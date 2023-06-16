import {container} from "./textContainer.js";

export const InputForm = () => {
    const containerOuter = container("form", ["input-form-inner"]);
    const containerInner = container("fieldset");

    const inputTextArea = container("div", ["form-group", "row", "mb-2"]);


    containerInner.appendChild(inputTextArea);

    containerOuter.appendChild(containerInner);
}

export default inputForm;