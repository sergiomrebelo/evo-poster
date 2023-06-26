
import {container} from "./utils.js";

const errorHandler = (res = {success: false}) => {

    // remove any message
    document.querySelectorAll(`#error-handle`).forEach((el) => {
        el.remove();
    });


    const containerOuter = container("div", ["temp-results", "container-fluid", "bg-light",], "error-handle");
    const containerInner = container("div", ["row"]);
    const mainSection = container("section", ["col-12", "bg-warning", "p-3"]);
    const info = container("span", [], "err-message")
    info.innerHTML = res.message;


    mainSection.appendChild(info);
    containerInner.appendChild(mainSection);
    containerOuter.appendChild(containerInner);

    document.body.appendChild(containerOuter);



    return containerOuter;
}


export default errorHandler;