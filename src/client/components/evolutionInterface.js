import {html, LitElement, nothing} from "lit";
import {Divider} from "./Divider.js";
import {Params} from "../Params.js";

export class EvolutionInterface extends LitElement {
    static properties = {
    }
    constructor(params, initFunction, pop) {
        super();
        this.params = params;
        this.initPop = initFunction;
        this.pop = pop;
    }

    #updateSize = () => {
        let width = parseFloat(document.getElementById(`size-x-input`).value.replace(",", "."));
        let height = parseFloat(document.getElementById(`size-y-input`).value.replace(",", "."));

        width = isNaN(width) || width === undefined || width === null ? 1 : width;
        height = isNaN(height) || height === undefined || height === null ? 1 : height;

        // automatic width calculation (width remains 1)
        if (width !== 1) {
            height = Math.round(parseFloat(height/width)*100) / 100;
            width = 1;
        }

        this.params.size.width = Params.visualisationGrid.width * width;
        this.params.size.height = Params.visualisationGrid.height * height;

        document.getElementById(`size-x-input`).value = width;
        document.getElementById(`size-y-input`).value = height;
        this.initPop(true);
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
                                           <input type="text" class="form-control" id="size-x-input" placeholder="width" value="1"
                                                  @change="${this.#updateSize}">
                                       </div>
                                       <div class="col-3" id="size-y">
                                           <input type="text" class="form-control" id="size-y-input" 
                                                  placeholder="height" 
                                                  value="${Math.round(this.params.size.height/this.params.size.width*100)/100}"
                                                  @change="${this.#updateSize}">
                                       </div>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Typography Main Colour</b>
                                       </small>
                                       <div class="my-2">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker mr-2 d-inline-flex"
                                                  id="typography-colour-picker" value="${this.params.typography.color.value}" title="colour-typography" disabled 
                                                  @change="${(e) => {
                                                      if (this.params.typography.color.value !== e.target.value) {
                                                          this.params.typography.color.value = e.target.value;
                                                          this.initPop();
                                                      }
                                                  }}">
                                           <div class="d-inline-flex flex-md-fill mx-2">
                                               <input class="form-check-input" type="checkbox" value="" 
                                                      id="random-colour-typo-check" checked=true
                                                      @change="${ async (e) => {
                                                          const el = document.getElementById(`typography-colour-picker`);
                                                          this.params.typography.color.random = e.target.checked;
                                                          el.disabled = e.target.checked;
                                                          this.initPop();
                                                      }}">
                                               <label class="form-check-label small px-2" for="color-typo-check">Random</label>
                                           </div>
                                       </div>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Content</b><br>
                                           (each line of text must be defined using a semicolon)
                                       </small>
                                       <textarea class="form-control my-2" id="text-area-content-begin" rows="${this.params.sentences.length}" 
                                                 @change="${ async (e) => {
                                                     const textContent = e.target.value.split("¶")
                                                     this.params["sentences"] = textContent.map(t => t.trim());
                                                     this.initPop();
                                                 }}">${this.params.sentences.join(`¶`)}</textarea>
                                   </div>
                                   ${Divider.get()}
                                   <div class="form-group">
                                       <small class="my-2">
                                           <b>Background</b><br>
                                           (Visual style of background)
                                       </small>
                                       <select 
                                               class="form-select form-select-sm my-2" id="background-style-form" 
                                               @change="${(e) => {
                                                   const els = document.querySelectorAll(`.colour-background`);
                                                   const randomColours = document.getElementById(`random-colour-background-check`);
                                                   this.params.background.color.random = randomColours.checked;
                                                   this.params.background.style = e.target.value;
                                                   if (!randomColours.checked) {
                                                       const numberOfColours = Params.background.availableStyles[parseInt(e.target.value)][1];
                                                       els.forEach((el, i) => {
                                                           if (i < numberOfColours) {
                                                               el.disabled = false;
                                                           } else {
                                                               el.disabled = true;
                                                           }
                                                       });
                                                   }
                                                   this.initPop();
                                               }}"
                                       >
                                           ${Params.background.availableStyles.map((x, i) => 
                                                   html`<option value=${i}>${x[0]}</option>`)
                                            }
                                       </select>
                                       <div class="my-2 align-items-baseline">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker d-inline-flex mr-2 colour-background"
                                                  id="background-1-colour-picker" value="${this.params.background.color.valueA}" title="colour-background-1" disabled 
                                                  @change="${(e) => {
                                                      if (this.params.background.color.valueA !== e.target.value) {
                                                          this.params.background.color.valueA = e.target.value;
                                                          this.initPop();
                                                      }
                                                  }}">
                                           <input type="color"
                                                  class="form-control form-control-color colour-picker mx-2 d-inline-flex colour-background" 
                                                  id="background-2-colour-picker" value="${this.params.background.color.valueB}" title="colour-background-2" disabled
                                                  @change="${(e) => {
                                                      if (this.params.background.color.valueB !== e.target.value) {
                                                          this.params.background.color.valueB = e.target.value;
                                                          this.initPop();
                                                      }
                                                  }}">
                                           <div class="d-inline-flex flex-md-fill">
                                               <input class="form-check-input" type="checkbox" 
                                                      value="" id="random-colour-background-check" checked 
                                                      @change="${(e) => {
                                                          const els = document.querySelectorAll(`.colour-background`);
                                                          this.params.background.color.random = e.target.checked;
                                                          if (!e.target.checked) {
                                                              const mainEl = document.querySelector(`#background-style-form`);
                                                              const numberOfColours = Params.background.availableStyles[parseInt(mainEl.value)][1];

                                                              els.forEach((el, i) => {
                                                                  if (i<numberOfColours) {
                                                                      el.disabled = false;
                                                                      this.params.background.color.random = false;
                                                                      /* el.classList.add( `d-inline-flex`);
                                                                      el.classList.remove (`d-none`)*/
                                                                  } else {
                                                                      el.disabled = true;
                                                                      /*el.classList.remove( `d-inline-flex`);
                                                                      el.classList.add (`d-none`)*/
                                                                  }
                                                              });
                                                              
                                                          } else {
                                                              els.forEach((el, i) => {
                                                                  el.disabled = true;
                                                                  /*el.classList.remove( `d-inline-flex`);
                                                                  el.classList.add (`d-none`)*/
                                                              });
                                                          }
                                                          this.initPop();
                                                      }}">
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
                                       <select class="form-select form-select-sm my-2" id="background-style-form" 
                                               @change="${(e) => {
                                                   console.log("text", e);
                                               }}">
                                           ${Params.textAlignmentOptions.map((x, i) =>
                                                   html`<option value=${i}>${x[0]}</option>`)
                                           }
                                       </select>
                                   </div>
                                   ${Divider.get()}
                                   <div class="com-group my-2">
                                       <input class="form-check-input" type="checkbox" value="" id="debug-check"
                                              checked="${this.params.display.grid}"
                                              @change="${(e) => {
                                                  this.params.display.grid = e.target.checked;
                                                  this.pop.toggleGrid(this.params.display.grid);
                                              }}">
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

customElements.define('init-form', EvolutionInterface);