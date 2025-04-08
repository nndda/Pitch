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

            <button class="button-general component-select-all" data-type="${compData["type"]}">
              <i class="fa-solid fa-square-check"></i>
            </button>

            <button class="button-general component-select-none hidden" data-type="${compData["type"]}">
              <i class="fa-regular fa-square-minus"></i>
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

          <button class="component-toggle" data-comp="${compName}">
            ${compName}
            ${compData["notes"].includes("Experimental") ? `
              <span class="icon">
                <i class="fa-solid fa-vial"></i>
              </span>
            ` : ""}
          </button>
        </dd>
      `);

      compElemItem.on("input", `input#${compID}`, () => {
        updateSelectAllNoneBtn();
        calculateComponents();
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

      compList.append(compElemItem);
    }
  }
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
              <i class="fa-solid fa-eye"></i>
              <!--
              <span>
                Show HTML
              </span>
              -->
              <div class="tooltip-content">
                Show the HTML codes
              </div>
            </button>

            ${navigator.clipboard ? `
              <button class="button-general comp-copy tooltip">
                <i class="fa-solid fa-copy"></i>
                <!--
                <span class="comp-copy-text">
                  Copy
                </span>
                -->
                <div class="tooltip-content">
                  Copy the HTML codes
                </div>
              </button>

              <span class="comp-copy-text"></span>
            ` : ""}

            <div class="flex-space"></div>

            <button class="button-general comp-codepen-edit tooltip">
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-brands fa-codepen"></i>
              <div class="tooltip-content tooltip-r">
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
  const compSelected: NodeListOf<HTMLInputElement> = d.querySelectorAll("input[name='component-toggle']:checked");

  pick2notif.classList.toggle("hidden-opac", compSelected.length > 0);

  if (navigator.clipboard) {
    compileCompBtn.disabled = compSelected.length <= 0;
    copyNotif.innerText = "";
  }

  const selectedComps: string[] = [];

  compSelected.forEach((el) => {
    selectedComps.push(el.getAttribute("data-comp"));
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