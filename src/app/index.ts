// @ts-ignore
import(/* webpackPreload: true */ "./styles/main.scss");

const d: Document = document;

import type {
  PitchComponentsCollection,
  PitchComponentData,
  PitchComponentInput,
  PitchComponentScope,
} from "./scripts/components";
import { compileComponents } from "./scripts/compile";
import {
  copyNotif,
  copyComponentsCSS,
  copyComponentHTML,
  copyTimeout,
  CSSCopyOutput,
} from "./scripts/copy";

// HTML syntax highlighter
import {
  highlightHTML,
  highlightCSS,
} from "./scripts/highlighter";

// Version field
import packageJSON from "../../package.json";
d.querySelectorAll(".version-field").forEach((verEl: HTMLElement): void => {
  verEl.textContent = packageJSON.version;
});

// Main compiled components data
import componentsCollectionJSON from "./components.json";
const componentsCollection: PitchComponentsCollection = componentsCollectionJSON as PitchComponentsCollection;

// Components list
const compList: JQuery<HTMLElement> = $("#components-list");

const compileCompBtn: HTMLInputElement = d.getElementById("compile-components-btn") as HTMLInputElement;

const compTitle: HTMLElement = d.getElementById("component-title");
// const compDesc: HTMLElement = d.getElementById("component-description");

export const wrapper: HTMLElement = d.getElementById("wrapper");

const compPreview: JQuery<HTMLElement> = $("#component-preview");
const compInputs: JQuery<HTMLElement> = $("#component-inputs");
const compNotes: JQuery<HTMLElement> = $("#component-notes");
// const compLabelsCont: JQuery<HTMLElement> = $("#component-labels");

const compGroups: string[] = [];

// Declare current session input data, and check if ones already stored in localStorage
const compInputsData: Record<string, string> = JSON.parse(localStorage.getItem("pitchInputData")) ?? {};

// (Should be) called whenever components-specific inputs are made/changed
function updateInputs(): void {
  calculateComponents();

  // NOTE: This might be not very performant
  localStorage.setItem("pitchInputData", JSON.stringify(compInputsData));
}

const compNotesData: Record<string, string> = {
  Experimental: "Use with caution, and test thoroughly."
};

const pick2notif: HTMLElement = d.querySelector(".pick-2-notif");

// CodePen Prefill
import { constructOptions } from "./scripts/codepen";

// localStorage components user data
import {
  pitchComp,
  setCompLocalData,
  getCompLocalData,
} from "./scripts/storage";

// To get the 'parent' of a 'sub' component list element
// TODO: reference the parent in componentsCollection instead
function getCompParent(compListEl: HTMLElement): HTMLElement | null {
  if (compListEl.hasAttribute("data-sub")) {
    return d.querySelector(`li[data-comp="${compListEl.getAttribute("data-sub")}"]`);
  }

  return null;
}

// Check if any 'sub' components is favourited 
function isSubsHasAnyFaved(subId: string): boolean {
  for (const el of d.querySelectorAll(`li[data-sub="${subId}"]`)) {
    if (el.classList.contains("is-faved")) return true;
  }

  return false;
}

// Favourite
// Favourite button
const favBtn: HTMLInputElement = d.getElementById("comp-fav-btn") as HTMLInputElement;

favBtn.addEventListener("click", () => {
  // TODO: this variable name might cause misunderstanding
  const compName: string = favBtn.getAttribute("data-comp");

  d.querySelector(`button[data-comp-id="${compName}"]>.icon.fav`).classList.toggle("hidden", !favBtn.checked);

  const compListEl: HTMLElement = d.querySelector(`li[data-comp="${compName}"]`);
  compListEl.classList.toggle("is-faved", favBtn.checked);

  // Consider the 'parent' of a sub component list element
  if (compListEl.hasAttribute("data-sub")) {
    getCompParent(compListEl).classList.toggle(
      "is-faved",
      isSubsHasAnyFaved(
        compListEl.getAttribute("data-sub")
      )
    );
  }

  setCompLocalData(compName, { "fav": favBtn.checked });

  updateCompListFilterState();
});

const selectAllNoneUpdates: (() => void)[] = [];

function initializeComponents(): void {
  // i hate js/ts
  let currentIteratedCompType: string = ""; // <- dangewous
  let compListItems: JQuery<HTMLElement> = $(`<ul class="nostyle"></ul>`);

  // should've used traditional for-loop huh...
  const totalComps: number = (
    Object.keys(componentsCollection) as Array<keyof typeof componentsCollection>
  ).length - 1;
  let currentIteratedCompN: number = 0;

  for (const comp in componentsCollection) {
    const compData: PitchComponentData = componentsCollection[comp];
    currentIteratedCompN++;

    if (comp !== "_variables") {
      const compName: string = compData["name"];
      const compID: string = "comp-" + comp;

      const updateSelectAllNoneBtn = (): void => {
        const hasOneActive: boolean = d.querySelectorAll(`li:not(.hidden) > input[data-type="${compData["type"]}"][name="component-toggle"]:checked`).length > 0;

        d.querySelector(`button.component-select-all[data-type="${compData["type"]}"]`)
          .classList.toggle("hidden", hasOneActive);
        d.querySelector(`button.component-select-none[data-type="${compData["type"]}"]`)
          .classList.toggle("hidden", !hasOneActive);
      }
      // Why am I doing this
      selectAllNoneUpdates.push(updateSelectAllNoneBtn);

      // Component group/category title
      // TODO: optimize this
      function createCompCatTitle(): void {
      if (!compGroups.includes(compData["type"])) {
        compGroups.push(compData["type"]);
        const compElemGroup: JQuery<HTMLElement> = $(`
          <h2>
            <span class="component-type-title">
              <i class="icon fa-solid
                fa-${
                    compData["type"] === "components"
                  ? "bars-progress"

                  : compData["type"] === "decorations"
                  ? "brush"

                  : compData["type"] === "tweaks"
                  ? "pen-ruler"

                  : ""
                }
                "
              >
              </i>
              ${compData["type"]}
            </span>

            <button class="button-general component-select-all tooltip" data-type="${compData["type"]}">
              <i class="fa-solid fa-square-check"></i>

              <small class="tooltip-content tooltip-l">
                Select all
              </small>
            </button>

            <button class="button-general component-select-none tooltip hidden" data-type="${compData["type"]}">
              <i class="fa-regular fa-square-minus"></i>

              <small class="tooltip-content tooltip-l">
                Select none
              </small>
            </button>
          </h2>
        `);

        compElemGroup.on("click", ".component-select-all", () => {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach((el: HTMLInputElement) => {
              if (!el.parentElement.classList.contains("hidden")) el.checked = true;
          });
          updateSelectAllNoneBtn();
          calculateComponents();
        });

        compElemGroup.on("click", ".component-select-none", () => {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach((el: HTMLInputElement) => {
              if (!el.parentElement.classList.contains("hidden")) el.checked = false;
          });
          updateSelectAllNoneBtn();
          calculateComponents();
        });

        compList.append(compElemGroup);
      }
      };

      // See if the component is marked as favourite on the localStorage
      let isFaved: boolean = false;
      if (pitchComp[comp] !== null && pitchComp[comp] !== undefined) {
        if (pitchComp[comp]["fav"] !== null && pitchComp[comp]["fav"] !== undefined) {
          isFaved = pitchComp[comp]["fav"];
        }
      }

      // Check for the saved ticked/checked local data
      if (getCompLocalData(comp, "ticked") === null) {
        setCompLocalData(comp, { "ticked": false });
      }

      const isTickedLocally: boolean = getCompLocalData(comp, "ticked");

      const compElemItem: JQuery<HTMLElement> = $(`
        <li
          data-comp="${comp}"
          data-search="${compName}"
          ${compData.sub != undefined ? `data-sub="${compData.sub}"` : ""}
          class="
          ${compData.sub != undefined ? "sub" : ""}
          ${compData.groupOnly ? "non-interractable" : ""}
          ${isFaved ? "is-faved" : ""}
          ${compData["notes"].includes("Experimental") ? "is-exp" : ""}
          ">

          ${
            !compData.groupOnly ?
            `
              <input
                type="checkbox"
                name="component-toggle"
                id="${compID}"
                data-comp="${comp}"
                data-type="${compData["type"]}"
                ${
                  // Set ticked/checked status based off the local data
                  isTickedLocally ? "checked" : ""
                }
              >

              <label for="${compID}">
                <i class="fa-solid fa-square-check checked-not"></i>
                <i class="fa-regular fa-square checked"></i>
              </label>
            `
            :
            `
              <label>
                <i class="fa-solid fa-caret-down"></i>
              </label>
            `
          }

          <button class="component-toggle" data-comp="${compName}" data-comp-id="${comp}">
            <span class="text">
              ${compName}
            </span>
            ${compData["notes"].includes("Experimental") ? `
              <span class="icon exp">
                <i class="fa-solid fa-vial"></i>
              </span>
            ` : ""}

              <span class="icon fav ${isFaved ? "" : "hidden"}">
                <i class="fa-solid fa-star"></i>
              </span>
          </button>
        </li>
      `);

      compElemItem.on("input", `input#${compID}`, () => {
        updateSelectAllNoneBtn();
        calculateComponents();

        // Saved ticked/checked state to the local storage
        setCompLocalData(comp, { "ticked": (d.getElementById(`${compID}`) as HTMLInputElement).checked });
      });

      compElemItem.on("click", "button.component-toggle", () => {
        setCompInfo(comp);

        currViewedComp?.removeClass("viewed");
        currViewedComp = compElemItem;
        currViewedComp.addClass("viewed");
      });

      componentsCollection[comp].elemCheck = (compElemItem.find(`input#${compID}`)[0] as HTMLInputElement);

      if (compData.sub != undefined) {
        if (!componentsCollection[compData.sub].groupOnly) {
          compElemItem.on("input", "input[name=\"component-toggle\"]", () => {
            if (componentsCollection[comp].elemCheck.checked) {
              componentsCollection[compData.sub].elemCheck.checked = true;
            }
          });
        }
      }

      // Initialize default user input
      if (compData.inputVars) {
        compData.inputs.forEach(val => {
          if (!Object.prototype.hasOwnProperty.call(compInputsData, val.id)) {
            if (val.default) {
              compInputsData[val.id] = val.default;
            }
          }
        });
      }

      if (
        currentIteratedCompType !== compData["type"] ||
        currentIteratedCompN === totalComps
      ) {
        compList.append(compListItems);

        if (currentIteratedCompN !== totalComps) {
          compListItems = $(`<ul class="nostyle"></ul>`);
        }

        createCompCatTitle();
      }

      compListItems.append(compElemItem);

      if (isTickedLocally) {
        updateSelectAllNoneBtn();
      }

      currentIteratedCompType = compData["type"];
    }
  }

  // TODO optimize this
  // Account for the 'parent' of the 'sub' components
  const finished: string[] = [];
  for (const compListElSub of d.querySelectorAll("li[data-sub]")) {
    const subId: string = compListElSub.getAttribute("data-sub");

    if (!finished.includes(subId)) {
      const compParentClasses: DOMTokenList = getCompParent(compListElSub as HTMLElement).classList;

      // Account for 'toggleable parent'
      const perserveFave: boolean = compParentClasses.contains("is-faved");

      compParentClasses.toggle(
        "is-faved",
        isSubsHasAnyFaved(subId)
      );

      if (perserveFave) compParentClasses.add("is-faved");

      finished.push(subId);
    }
  }

  calculateComponents();
}

const homeButton: JQuery<HTMLElement> = $("#home-button");
const homePreview: JQuery<HTMLElement> = $("#home-preview");
const homeContent: JQuery<HTMLElement> = $(".home-content");

homeButton.on("click", function() {
  setHome();
});

function setHome(): void {
  homePreview.addClass("hidden-opac");

  compTransTimer = setTimeout(() => {

    homeButton.toggleClass("hidden", true);
    homePreview.toggleClass("hidden", false);
    homeContent.toggleClass("hidden", false);
    compPreview.toggleClass("hidden", true);
    compInputs.toggleClass("hidden", true);
    compNotes.toggleClass("hidden", true);

    compPreview.html("");
    compInputs.html("");
    compNotes.html("");
    compTitle.textContent =
      "Pitch";
    // compDesc.textContent =
    //   "Collection of CSS components and tweaks designed specifically for itch.io project pages.";

    currViewedComp?.removeClass("viewed");

    wrapper.scrollTop = 0;

    homePreview.removeClass("hidden-opac");

  }, 200)
}

let currViewedComp: JQuery<HTMLElement> = null;
let compTransTimer: NodeJS.Timeout;

function setCompInfo(comp: string): void {
  compTitle.textContent = componentsCollection[comp].nameDisplay;
  // compDesc.innerHTML = componentsCollection[comp].description;

  compPreview.off("click");
  compPreview.addClass("hidden-opac");
  compInputs.addClass("hidden-opac");
  compNotes.addClass("hidden-opac");

  // Set favourite status on favourite button
  favBtn.setAttribute("data-comp", comp);
  if (getCompLocalData(comp, "fav") !== null) {
    favBtn.checked = getCompLocalData(comp, "fav");
  } else {
    favBtn.checked = false;
  }

  if (compTransTimer !== null || compTransTimer !== undefined) clearTimeout(compTransTimer);

  compTransTimer = setTimeout(() => {

  compPreview.html("");
  compInputs.html("");
  compInputs.addClass("hidden");
  compNotes.html("");
  compNotes.addClass("hidden");
  // compLabelsCont.html("");

  if (copyTimeout !== null || copyTimeout !== undefined) clearTimeout(copyTimeout);

  if (componentsCollection[comp].inputs.length > 0) {
    for (const n in componentsCollection[comp].inputs) {

      const inpData: PitchComponentInput = componentsCollection[comp].inputs[n];

      // If input data is not present (from localStorage, or from session), fetch from default value
      compInputsData[inpData.id] = compInputsData[inpData.id] ?? (componentsCollection[comp].inputs[n].default ?? "");

      const inpComp: JQuery<HTMLElement> = $(`
        <div class="comp-inp-group">
          <label class="label" for="${inpData.id}">${inpData.name}</label>
          <input class="comp-input" id="${inpData.id}" type="text" value="${
            compInputsData[inpData.id] ?? (componentsCollection[comp].inputs[n].default ?? "")
          }">
          ${componentsCollection[comp].inputs[n].default ?
            `<button class="input-reset tooltip ${
              compInputsData[inpData.id] === componentsCollection[comp].inputs[n].default ?
              "hidden-opac" : ""
              }">
              <i class="fa-solid fa-arrow-rotate-left"></i>
              <span class="tooltip-content">
                Reset
              </span>
            </button>`
          : ""}
        </div>
      `);


      // Save input data to localStorage
      localStorage.setItem("pitchInputData", JSON.stringify(compInputsData));

      const inpEl: JQuery<HTMLInputElement> = inpComp.find("input.comp-input");

      // Default value reset button handling
      if (componentsCollection[comp].inputs[n].default) {
        const inpDefaultVal: string = componentsCollection[comp].inputs[n].default;
        const inpDefaultBtn: JQuery<HTMLButtonElement> = inpComp.find("button.input-reset");

        // Reset default button
        inpDefaultBtn.on("click", () => {
          // Set to component's default value:
          //  input element's (inpEl) value
              inpEl.val(inpDefaultVal);
          //  current session input data 
              compInputsData[inpData.id] = inpDefaultVal;

          // Hide the reset button
          inpDefaultBtn.addClass("hidden-opac");

          updateInputs();
        });

        // Toggle reset button visibility, when value isn't equal default
        inpEl.on("input", () => {
          inpDefaultBtn.toggleClass("hidden-opac", inpDefaultVal === inpEl.val());
        });
      }

      inpEl.on("input", ev => {
        compInputsData[inpData.id] = (ev.target as HTMLInputElement).value;

        updateInputs();
      });

      // Set the input container attribute, so that components-specific input SCSS styling can be applied
      // Styling @ styles/_inputs.scss, below #component-inputs
      compInputs.attr("data-comp", comp);

      compInputs.append(inpComp);
    }

    compInputs.removeClass("hidden");
    compInputs.removeClass("hidden-opac");
  }

  if (componentsCollection[comp].notes.length > 0) {
    for (const n in componentsCollection[comp].notes) {
      const note: string = componentsCollection[comp].notes[n];

      if (!note.startsWith("--custom-- ")) {
        compNotes.append($(`
          <div class="comp-notes ${note}">
            <div class="comp-notes-title">${note}</div>
            <div class="comp-notes-desc">${compNotesData[note]}</div>
          </div>
        `));
      } else {
        compNotes.append($(`
          <div class="comp-notes note-custom">
            <div class="comp-notes-title">Note</div>
            <div class="comp-notes-desc">${note.substring(11)}</div>
          </div>
        `));
      }
    }

    compNotes.removeClass("hidden");
    compNotes.removeClass("hidden-opac");
  }

  // Component scope labelling
  if (componentsCollection[comp].scopes) {
    let elStr: string = `<div class="component-docs">`;

    for (const scopeEnv in componentsCollection[comp].scopes) {
      // @ts-ignore
      const scopePage: PitchComponentScope = componentsCollection[comp].scopes[scopeEnv][0];

      elStr += `
        <div class="scope-label ${scopeEnv} tooltip">
          <div class="tooltip-content">
            ${
              scopeEnv === "compatible" 
              ? `
                <b>Full compatibility</b>
                `

              : scopeEnv === "partial"
              ? `
                <b>Partial compatibility</b>
                <br>
                Appearance may changes when used on the page above.
                `

              : scopeEnv === "none"
              ? `
                <b>Not supported</b>
                <br>
                Component will not function or display correctly when used on the page above.
                `

              : scopeEnv === "only"
              ? `
                Component only works on ${scopePage} pages
                ${
                  scopePage === "project" ? "and devlog pages" : ""
                }.
                `

              : ""
            }
          </div>

          <div class="icon">
            <i class="fa-solid fa-`;

      if (scopeEnv === "compatible") {
        elStr += "circle-check";
      } else if (scopeEnv === "partial") {
        elStr += "triangle-exclamation";
      } else if (scopeEnv === "none") {
        elStr += "square-xmark";
      } else if (scopeEnv === "only") {

        if (scopePage === "project") {
          elStr += "cube";
        } else if (scopePage === "profile") {
          elStr += "id-card-clip";
        } else if (scopePage === "jam") {
          elStr += "calendar-days";
        }
      }

      elStr += `"></i></div>`;

      // @ts-ignore
      for (const scopePage of componentsCollection[comp].scopes[scopeEnv]) {
        elStr += "<span>" + scopePage + " page</span>";
      }

      elStr += `</div>`
    }

    compPreview.append($(elStr + "</div>"));
  }


  for (const n in componentsCollection[comp].sampleHTML) {
    const compHTMLRaw: string = componentsCollection[comp].sampleHTML[n];

    if (!compHTMLRaw.startsWith("<!-- NOTE -->")) {

      // I know the vars are named with 'HTML'
      // But it also used to store possible CSS chunks
      const
        isCSS: boolean = compHTMLRaw.startsWith("<!-- CSS -->")
      , isIMG: boolean = compHTMLRaw.startsWith("<!-- IMG -->")
      ;

      const
        // HTML/CSS/IMG preview block
        compPreviewEl: JQuery<HTMLElement> = $(isIMG ? `
        <div class="component-container-single component-container-img">
          <div class="component-display">
            <img class="component-sample-img"
              src="./components/assets/${compHTMLRaw.replace("<!-- IMG -->", "").trim()}"
            >
          </div>
        </div>
      ` : `
        <div class="component-container-single ${ isCSS ? "css-cont" : "" }">
          ${
            isCSS ? "" : `
              <div class="component-display">
                ${compHTMLRaw}
              </div>

              <div class="component-preview-control">
                <button class="button-general comp-show-html tooltip">
                  <i class="fa-solid fa-code"></i>
                  <div class="tooltip-content">
                    Show HTML
                  </div>
                </button>

                ${
                  !navigator.clipboard ? "" : `
                    <button class="button-general comp-copy tooltip">
                      <i class="fa-solid fa-copy"></i>
                      <div class="tooltip-content tooltip-r">
                        Copy HTML
                      </div>
                    </button>

                    <span class="comp-copy-text"></span>
                  `
                }

                <div class="flex-space"></div>

                <button class="button-general comp-codepen-edit tooltip">
                  <i class="fa-solid fa-pen-to-square"></i>
                  <i class="fa-brands fa-codepen"></i>
                  <div class="tooltip-content tooltip-l">
                    Edit on CodePen
                  </div>
                </button>
              </div>
          `}

          <div class="component-html ${isCSS ? "" : "html-hidden"}">
            <pre><code>${
              isCSS ?
                highlightCSS(compHTMLRaw.replace("<!-- CSS -->", "")) :
                highlightHTML(compHTMLRaw)
            }</code></pre>
          </div>

          ${
            isCSS ? `
              <div class="component-preview-control">
                ${
                  !navigator.clipboard ? "" : `
                    <button class="button-general comp-copy tooltip">
                      <i class="fa-solid fa-copy"></i>
                      <div class="tooltip-content tooltip-r">
                        Copy CSS
                      </div>
                    </button>

                    <span class="comp-copy-text"></span>
                  `
                }
              </div>
            ` : ""
          }
        </div>
      `)
      , componentHTML: JQuery<HTMLElement> = compPreviewEl.find(".component-html")
      ;

      // CodePen Prefills
      if (!isCSS && !isIMG) {
        compPreviewEl.on("click", ".comp-codepen-edit", () => {
          constructOptions(
            componentsCollection[comp].nameDisplay,
            compHTMLRaw,
            // Get fonts and apply current preview theme
            `
              @import url(
                "https://fonts.googleapis.com/css?family=${encodeURI(wrapper.getAttribute("data-font"))}"
              );
              :root{${wrapper.getAttribute("style")}}
            `
          );
        });

        compPreviewEl.on("click", ".comp-show-html", () => {
          componentHTML.toggleClass("html-hidden");
        });
      }

      if (navigator.clipboard) {
        const componentCopyText = compPreviewEl.find(".comp-copy-text")[0];

        compPreviewEl.on("click", ".comp-copy", () => {
          copyComponentHTML(compHTMLRaw.replace("<!-- CSS -->", ""), componentCopyText);
        });
      }

      compPreview.append(compPreviewEl);

    } else {

      const
        compDoc: JQuery<HTMLElement> = $(`
          <div class="component-docs">
            ${compHTMLRaw}
          </div>
        `)
      , compButtons: JQuery<HTMLElement> = compDoc.find("button.button-primary")
      ;

      compButtons.each((_, el) => {
        const compName: string = el.textContent;
        el.addEventListener("click", () => {
          (d.querySelector(`button.component-toggle[data-comp="${compName}"]`) as HTMLButtonElement).click();
        });
      });

      compPreview.append(compDoc);
    }

    const compatNote: HTMLElement = compPreview[0].querySelector(".compatibility-note") as HTMLElement;

    if (compatNote) {
      const
        compatNoteType: string = compatNote.getAttribute("data-type")
      , compatNotePage: string[] = compatNote.getAttribute("data-page").split(",")
      , compatNoteVars: string[] = compatNote.getAttribute("data-vars").split(",")
      ;

      compatNote.innerHTML = `
        <br>
        <hr>
        <h2>Compatibility</h2>
        <p>
          This ${compatNoteType} relies on the following CSS variable${compatNoteVars.length > 1 ? "s" : ""}:
        </p>
        <ul>
          ${
            compatNoteVars.map((valr: string) => {
              return `
                <li><code>
                  --${valr.trim()}
                </code></li>
              `;
            }).join("")
          }
        </ul>
        <p>
          Which are <b>not present</b> on 
          ${
            compatNotePage.map((page: string, i: number) => {
              return `
                ${
                  (i === (compatNotePage.length - 1)) ? "and " : ""
                }
                <b>
                  ${page.trim()} page
                </b>
              `;
            }).join("")
          }.
          <br>
          Add and set them manually to make this ${compatNoteType} fully compatible with the above page${compatNotePage.length > 1 ? "s" : ""}.
        </p>
      `;
    }
  }

  // for (const n in componentsCollection[comp].sampleIMG) {
  //   compPreview.append($(`
  //     <div class="component-container-single component-container-img">
  //       <div class="component-display">
  //         <img class="component-sample-img"
  //           src="${componentsCollection[comp].sampleIMG[n]}"
  //         >
  //       </div>
  //     </div>
  //     <br>
  //   `));
  // }

  // if (componentsCollection[comp].labels !== undefined) {
  //   compLabelsCont.append($(`${
  //     componentsCollection[comp].labels.reduce((accum : string, value : string) => {
  //       return accum + `<span class="label-${value}">${value.replace(/-/g, " ")}</span>`
  //     }, "")
  //   }`));
  // }

  homeButton.toggleClass("hidden", false);
  homePreview.toggleClass("hidden", true);
  homeContent.toggleClass("hidden", true);
  compPreview.toggleClass("hidden", false);

  compPreview.removeClass("hidden-opac");

  wrapper.scrollTop = 0;

  calculateComponents();

  }, 200);
}

if (navigator.clipboard) {
  compileCompBtn.addEventListener("click", () => {
    copyComponentsCSS(CSSCopyOutput.val());
  });
} else {
  compileCompBtn.disabled = true;
  compileCompBtn.textContent = "Unable to copy";
  copyNotif.innerText = "";
}

// Cache selectedComps for repeat use in calculateComponents()
const selectedComps: string[] = [];
let compHasAtLeast1Selected: boolean = false;

// Calculate and compile the selceted components' CSS codes
function calculateComponents(): void {
  selectedComps.length = 0;

  // Iterate over the cached componentsCollection
  // (initialized at initializeComponents())
  for (const comp in componentsCollection) {
    if (componentsCollection[comp].elemCheck) {
      // Get the checkbox input element of the components
      const compInputEl: HTMLInputElement = componentsCollection[comp].elemCheck;

      if (compInputEl.checked) selectedComps.push(comp);

      // Save toggle state to localStorage
      setCompLocalData(comp, { "ticked": compInputEl.checked });
    }
  }

  compHasAtLeast1Selected = selectedComps.length > 0;

  pick2notif.classList.toggle("hidden-opac", compHasAtLeast1Selected);

  if (navigator.clipboard) {
    compileCompBtn.disabled = !compHasAtLeast1Selected;
    copyNotif.innerText = "";
  }

  CSSCopyOutput.val(compileComponents(
    selectedComps,
    componentsCollection,
    compInputsData
  ));
}

CSSCopyOutput.val("");
CSSCopyOutput.on("click", () => {
  CSSCopyOutput[0].select();
});

initializeComponents();

setHome();

calculateComponents();

import "./scripts/themes";

// Filter system
import { initSearch } from "./scripts/search";
const updateCompListFilterState: () => void = initSearch(d, () => {
  // Account for select all/none button of the components' categories
  for (const updt of selectAllNoneUpdates) {
    updt();
  }
});
updateCompListFilterState();

$(document).on("load", () => {
  $("components-selector-container-inner").css("height", "100%");
});