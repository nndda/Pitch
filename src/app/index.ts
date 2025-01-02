import "./styles/main.scss";

import { highlightHTML } from "./scripts/highlighter";
import { PitchComponentsCollection } from "./scripts/components";
import { compileComponents } from "./scripts/compile";
import {
  copyNotif,
  copyComponentsCSS,
  copyComponentHTML,
  copyTimeout,
  CSSCopyOutput
} from "./scripts/copy";

const d = document;

import componentsCollectionJSON from "./components.json";
const componentsCollection : PitchComponentsCollection = componentsCollectionJSON

const compList = $("#components-list");

const compileCompBtn = d.getElementById("compile-components-btn") as HTMLInputElement;

const compTitle = d.getElementById("component-title");
const compDesc = d.getElementById("component-description");

export const wrapper = document.getElementById("wrapper");

const compPreview = $("#component-preview");
const compLabelsCont = $("#component-labels");

const compGroups : string[] = [];

function initializeComponents() {
  for (const comp in componentsCollection) {
    const compData = componentsCollection[comp];

    if (comp !== "_variables") {
      const compName = compData["name"];
      const compID = "comp-" + comp;

      if (!compGroups.includes(compData["type"])) {
        compGroups.push(compData["type"]);
        const compElemGroup = $(`
          <dt>
            <span class="component-type-title">
              ${compData["type"]}
            </span>

            <button class="button-general component-select-all">
              <i class="fa-solid fa-square-check"></i>
            </button>

            <button class="button-general component-select-none">
              <i class="fa-regular fa-square-minus"></i>
            </button>
          </dt>
        `);

        compElemGroup.on("click", ".component-select-all", function() {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach(function(el : HTMLInputElement) {
              el.checked = true;
          });
          calculateComponents();
        });

        compElemGroup.on("click", ".component-select-none", function() {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`)
            .forEach(function(el : HTMLInputElement) {
              el.checked = false;
          });
          calculateComponents();
        });

        compList.append(compElemGroup);
      }

      const compElemItem = $(`
        <dd data-search="${compName}" ${
          compData.sub != undefined ? "class=\"sub\"" : ""
          }>
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

          <button class="component-toggle">
            ${compName}
          </button>
        </dd>
      `);

      compElemItem.on("input", `input#${compID}`, () => {
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
        compElemItem.on("input", "input[name=\"component-toggle\"]", () => {
          if (componentsCollection[comp].elemCheck.checked) {
            componentsCollection[compData.sub].elemCheck.checked = true;
          }
        });
      }

      compList.append(compElemItem);
    }
  }
}

const homeButton = $("#home-button");
const homePreview = $("#home-preview");
const homeContent = $(".home-content");

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

  compPreview.html("");
  compDesc.textContent = "Collection of CSS components and tweaks designed specifically for itch.io project pages.";
  compTitle.textContent = "Pitch";

  currViewedComp?.removeClass("viewed");

  wrapper.scrollTop = 0;

  homePreview.removeClass("hidden-opac");

  }, 200)
}

let currViewedComp : JQuery<HTMLElement> = null;

let compTransTimer : NodeJS.Timeout;

function setCompInfo(comp : string) {
  compTitle.textContent = componentsCollection[comp].name;
  compDesc.innerHTML = componentsCollection[comp].description;

  compPreview.off("click");
  compPreview.addClass("hidden-opac");

  if (compTransTimer !== null || compTransTimer !== undefined) clearTimeout(compTransTimer);

  compTransTimer = setTimeout(() => {

  compPreview.html("");

  compLabelsCont.html("");

  if (copyTimeout !== null || copyTimeout !== undefined) clearTimeout(copyTimeout);

  for (const n in componentsCollection[comp].sampleHTML) {
    const compHTMLRaw = componentsCollection[comp].sampleHTML[n];

    const compPreviewEl = $(`
      <div class="component-container-single">
        <div class="component-display">
          ${compHTMLRaw}
        </div>

        <div class="component-preview-control">
          <button class="button-general comp-show-html">
            <i class="fa-solid fa-eye"></i>
            <span>
              Show HTML
            </span>
          </button>

          ${navigator.clipboard ? `
            <button class="button-general comp-copy">
              <i class="fa-solid fa-copy"></i>
              <span class="comp-copy-text">
                Copy
              </span>
            </button>
          ` : ""}
        </div>

        <div class="component-html html-hidden">
          <pre><code>${highlightHTML(compHTMLRaw)}</code></pre>
        </div>
      </div>
      <br>
    `);

    const componentHTML = compPreviewEl.find(".component-html");

    compPreviewEl.on("click", ".comp-show-html", () => {
      if (componentHTML.hasClass("html-hidden")) {
        componentHTML.removeClass("html-hidden");
      } else {
        componentHTML.addClass("html-hidden");
      };
    });

    if (navigator.clipboard) {
      const componentCopyText = compPreviewEl.find(".comp-copy-text")[0];
      compPreviewEl.on("click", ".comp-copy", () => {
        copyComponentHTML(compHTMLRaw, componentCopyText);
      });
    }

    compPreview.append(compPreviewEl);
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

  if (componentsCollection[comp].labels !== undefined) {
    compLabelsCont.append($(`${
      componentsCollection[comp].labels.reduce((accum : string, value : string) => {
        return accum + `<span class="label-${value}">${value.replace(/-/g, " ")}</span>`
      }, "")
    }`));
  }

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

  d.querySelector(".pick-2-notif").textContent = "";
}

function calculateComponents() {
  const compSelected = d.querySelectorAll("input[name='component-toggle']:checked");

  if (navigator.clipboard) {
    compileCompBtn.disabled = compSelected.length <= 0;
    copyNotif.innerText = "";
  }

  const selectedComps : string[] = [];

  compSelected.forEach((el) => {
      selectedComps.push(el.getAttribute("data-comp"));
  });

  CSSCopyOutput.val(compileComponents(
    selectedComps,
    componentsCollection
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