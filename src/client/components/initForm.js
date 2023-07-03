import {html, LitElement} from "lit";
import {Divider} from "./Divider.js";
import {Params} from "../Params.js";

export class InitForm extends LitElement {
    static properties = {
    }
    constructor(params) {
        super();
        this.params = params;
    }

    render(){

        return html`<div class="wrapper initial-Form-outer container-fluid collapse show">
            <section id="initialForm" class="initial-Form-inner row">
                <div class="offset-sm-6 col-12 col-sm-6 p-3" id="info-init">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="poster-tab" data-bs-toggle="tab"
                                    data-bs-target="#poster-tab-pane"
                                    type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">General
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content m-3" id="tabs-contents">
                        <div class="tab-pane fade show active" id="poster-tab-pane" role="tabpanel"
                             aria-labelledby="poster-tab" tabindex="0">
                            <div class="row form-group my-2" id="poster-features">
                               <form>
                                   <div class="form-group row">
                                       <small class="my-2">
                                           <b>Poster size</b><br>
                                           (width x height ratio)
                                       </small>
                                       <div class="col-3" id="size-x">
                                           <input type="text" class="form-control" id="size-x-input" placeholder="width" value="1">
                                       </div>
                                       <div class="col-3" id="size-y">
                                           <input type="text" class="form-control" id="size-y-input" 
                                                  placeholder="height" value="${Math.round(this.params.posterSize.height/this.params.posterSize.width*100)/100}">
                                       </div>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Typography Main Colour</b>
                                       </small>
                                       <div class="my-2">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker d-inline-flex mr-2"
                                                  id="background-2-colour-picker" value="#000000" title="colour-2">
                                           <div class="d-inline-flex flex-md-fill mx-2">
                                               <input class="form-check-input" type="checkbox" value="" id="random-colour-typo-check">
                                               <label class="form-check-label small px-2" for="debug-check">Random</label>
                                           </div>
                                       </div>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Content</b><br>
                                           (each line of text must be defined using a semicolon)
                                       </small>
                                       <textarea class="form-control my-2" id="text-area-content-begin" rows="3">${this.params.text}</textarea>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Background</b><br>
                                           (Visual style of background)
                                       </small>
                                       <select class="form-select form-select-sm my-2" id="background-style-form">
                                           ${Params.backgroundStyleOptions.map((x, i) => 
                                                   html`<option value=${i}>${x[0]}</option>`)
                                            }
                                       </select>
                                       <div class="my-2 align-items-baseline">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker d-inline-flex"
                                                  id="background-1-colour-picker" value="#FF0000" title="colour-2">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker d-inline-flex mx-2"
                                                  id="background-2-colour-picker" value="#000000" title="colour-2">
                                           <div class="d-inline-flex flex-md-fill">
                                               <input class="form-check-input" type="checkbox" value="" id="random-colour-background-check">
                                               <label class="form-check-label small px-2" for="debug-check">Random</label>
                                           </div>
                                       </div>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Alignment</b><br>
                                           (Text alignment on poster)
                                       </small>
                                       <select class="form-select form-select-sm my-2" id="background-style-form">
                                           ${Params.textAlignmentOptions.map((x, i) =>
                                                   html`<option value=${i}>${x[0]}</option>`)
                                           }
                                       </select>
                                   </div>
                                   ${Divider.get()}
                                   <div class="com-group my-2">
                                       <input class="form-check-input" type="checkbox" value="" id="debug-check" checked>
                                       <label class="form-check-label small px-2" for="debug-check">Show Grid</label>
                                   </div>
                               </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`;
    }
    createRenderRoot() {
        return this;
    }
}

customElements.define('init-form', InitForm);