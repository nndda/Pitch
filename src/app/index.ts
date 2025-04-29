// @ts-ignore
import(/* webpackPreload: true */ "./styles/main.scss");

const d: Document = document;

import type {
  PitchComponentsCollection,
  PitchComponentData,
  PitchComponentInput,
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
import { highlightHTML } from "./scripts/highlighter";

// Main compiled components data
import componentsCollectionJSON from "./components.json";
const componentsCollection: PitchComponentsCollection = componentsCollectionJSON;

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

const compInputsData: Record<string, string> = {};

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

// Favourite
// Favourite button
const favBtn: HTMLInputElement = d.getElementById("comp-fav-btn") as HTMLInputElement;

favBtn.addEventListener("click", () => {
  const compName: string = favBtn.getAttribute("data-comp");

  d.querySelector(`button[data-comp-id="${compName}"]>.icon.fav`).classList.toggle("hidden", !favBtn.checked);
  setCompLocalData(compName, { "fav": favBtn.checked });
});

function initializeComponents(): void {
  for (const comp in componentsCollection) {
    const compData: PitchComponentData = componentsCollection[comp];

    if (comp !== "_variables") {
      const compName: string = compData["name"];
      const compID: string = "comp-" + comp;

      const updateSelectAllNoneBtn = () => {
        const hasOneActive: boolean = d.querySelectorAll(`input[data-type="${compData["type"]}"][name="component-toggle"]:checked`).length > 0;

        d.querySelector(`button.component-select-all[data-type="${compData["type"]}"]`)
          .classList.toggle("hidden", hasOneActive);
        d.querySelector(`button.component-select-none[data-type="${compData["type"]}"]`)
          .classList.toggle("hidden", !hasOneActive);
      }

      if (!compGroups.includes(compData["type"])) {
        compGroups.push(compData["type"]);
        const compElemGroup: JQuery<HTMLElement> = $(`
          <dt>
            <span class="component-type-title">
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
          </dt>
        `);

        compElemGroup.on("click", ".component-select-all", () => {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach((el: HTMLInputElement) => {
              el.checked = true;
          });
          updateSelectAllNoneBtn();
          calculateComponents();
        });

        compElemGroup.on("click", ".component-select-none", () => {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach((el: HTMLInputElement) => {
              el.checked = false;
          });
          updateSelectAllNoneBtn();
          calculateComponents();
        });

        compList.append(compElemGroup);
      }

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
        <dd data-search="${compName}" class="
          ${compData.sub != undefined ? "sub" : ""}
          ${compData.groupOnly ? "non-interractable" : ""}
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
            ${compName}
            ${compData["notes"].includes("Experimental") ? `
              <span class="icon">
                <i class="fa-solid fa-vial"></i>
              </span>
            ` : ""}

              <span class="icon fav ${isFaved ? "" : "hidden"}">
                <i class="fa-solid fa-star"></i>
              </span>
          </button>
        </dd>
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

      componentsCollection[comp].elemCheck = <HTMLInputElement>compElemItem.find("input[name=\"component-toggle\"]")[0];

      if (compData.sub != undefined) {
        if (!componentsCollection[compData.sub].groupOnly) {
          compElemItem.on("input", "input[name=\"component-toggle\"]", () => {
            if (componentsCollection[comp].elemCheck.checked) {
              componentsCollection[compData.sub].elemCheck.checked = true;
            }
          });
        }
      }

      if (isTickedLocally) {
        updateSelectAllNoneBtn();
      }

      compList.append(compElemItem);
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
      const inpComp: JQuery<HTMLElement> = $(`
        <div class="comp-inp-group">
          <label class="label" for="${inpData.id}">${inpData.name}</label>
          <input class="comp-input" id="${inpData.id}" type="text" value="${
            compInputsData[inpData.id] ?? ""
          }">
        </input>
        </div>
      `);

      inpComp.on("input", "input.comp-input", ev => {
        compInputsData[inpData.id] = (ev.target as HTMLInputElement).value;
        calculateComponents();
      });
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

  for (const n in componentsCollection[comp].sampleHTML) {
    const compHTMLRaw: string = componentsCollection[comp].sampleHTML[n];

    if (!compHTMLRaw.startsWith("<!-- NOTE -->")) {

      const
        compPreviewEl: JQuery<HTMLElement> = $(`
        <div class="component-container-single">
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

            ${navigator.clipboard ? `
              <button class="button-general comp-copy tooltip">
                <i class="fa-solid fa-copy"></i>
                <div class="tooltip-content tooltip-r">
                  Copy HTML
                </div>
              </button>

              <span class="comp-copy-text"></span>
            ` : ""}

            <div class="flex-space"></div>

            <button class="button-general comp-codepen-edit tooltip">
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-brands fa-codepen"></i>
              <div class="tooltip-content tooltip-l">
                Edit on CodePen
              </div>
            </button>
          </div>

          <div class="component-html html-hidden">
            <pre><code>${highlightHTML(compHTMLRaw)}</code></pre>
          </div>
        </div>
      `)
      , componentHTML: JQuery<HTMLElement> = compPreviewEl.find(".component-html")
      ;

      // CodePen Prefills
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

      if (navigator.clipboard) {
        const componentCopyText = compPreviewEl.find(".comp-copy-text")[0];

        compPreviewEl.on("click", ".comp-copy", () => {
          copyComponentHTML(compHTMLRaw, componentCopyText);
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
  }

  for (const n in componentsCollection[comp].sampleIMG) {
    compPreview.append($(`
      <div class="component-container-single component-container-img">
        <div class="component-display">
          <img class="component-sample-img"
            src="${componentsCollection[comp].sampleIMG[n]}"
          >
        </div>
      </div>
      <br>
    `));
  }

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

  }, 200)
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

function calculateComponents(): void {
  // Get the checkbox input element of the components
  const compInputEl: NodeListOf<HTMLInputElement> = d.querySelectorAll("input[name='component-toggle']");

  pick2notif.classList.toggle("hidden-opac", compInputEl.length > 0);

  if (navigator.clipboard) {
    compileCompBtn.disabled = compInputEl.length <= 0;
    copyNotif.innerText = "";
  }

  const selectedComps: string[] = [];

  // Iterate over components' input element
  compInputEl.forEach((el: HTMLInputElement) => {
    const comp: string = el.getAttribute("data-comp");

    if (el.checked) selectedComps.push(comp);

    // Save toggle state to localStorage
    setCompLocalData(comp, { "ticked": el.checked });
  });

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

calculateComponents();

initializeComponents();

setHome();

import "./scripts/themes";
import "./scripts/search";

$(document).on("load", () => {
  $("components-selector-container-inner").css("height", "100%");
});