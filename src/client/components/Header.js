import {LitElement, html, css, nothing} from "lit";

export class Header extends LitElement {
    static properties = {
        evolutionaryInterface: false
    }

    constructor(controller= false) {
        super();
        this.evolutionaryInterface = controller;
    }

    showControls = () => {
        this.evolutionaryInterface = true;
    }

    render() {
        return html`<nav class="container-fluid z-3 position-sticky top-0" id="header-container">
            <header class="navbar justify-content-center align-items-start">
                <div class="${this.evolutionaryInterface ? `col-10` :  `col-12`} mt-2">
                    <a class="navbar-brand m-0 p-0" href="#">
                        <h1 class="m-0 p-0">Evolving Posters</h1>
                    </a>
                </div>
                ${this.evolutionaryInterface ? html`<div class="col-2 d-flex justify-content-end mt-2 d-block">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-toggle="collapse" 
                            data-target="#evo-interface-inner" data-bs-target="#evo-interface-inner" aria-controls="evo-interface-inner" 
                            aria-expanded="false" aria-label="Toggle navigation" 
                            @click="${(e) => {
                                const divs = document.querySelectorAll('.opacity-fade');
                                divs.forEach((el) => {
                                    el.classList.toggle('show');
                                })
                            }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>`: nothing}
            </header>
            <hr>
        </nav>`;
    }


    createRenderRoot() {
        return this;
    }
}

customElements.define('header-section', Header);