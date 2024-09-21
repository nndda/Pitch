import "./styles/main.scss";

import { PitchComponentsCollection } from "./scripts/components";
import { compileComponents } from "./scripts/compile";
import { copyNotif, copyComponentHTML } from "./scripts/copy";
import { highlightHTML } from "./scripts/highlighter";

const d = document;

const componentsCollection : PitchComponentsCollection = require("./components.json")

const compList = $("#components-list");

const compileCompBtn = <HTMLInputElement>d.getElementById("compile-components-btn");

const compTitle = d.getElementById("component-title");
const compDesc = d.getElementById("component-description");

const compPreview = $("#component-preview");
const compLabelsCont = $("#component-labels");

let compGroups : string[] = []

function initializeComponents() {
  for (const comp in componentsCollection) {
    let compData = componentsCollection[comp];

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
        <dd data-search="${compName}">
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

      compElemItem.on("input", `input#${compID}`, function() {
        calculateComponents();
      });

      compElemItem.on("click", "button.component-toggle", function() {
        setCompInfo(comp);
        if (currViewedComp !== null) {
          currViewedComp.removeClass("viewed");
        }
        currViewedComp = compElemItem;
        currViewedComp.addClass("viewed");
      });

      compList.append(compElemItem);
    }
  }
}

const homeButton = $("#home-button");
const homePreview = $("#home-preview");

homeButton.on("click", function() {
  setHome()
});

function setHome(): void {
  homePreview.toggleClass("hidden", false);
  homeButton.toggleClass("hidden", true);
  compPreview.toggleClass("hidden", true);

  compPreview.html("");
  compDesc.textContent = "Small collection of CSS components and tweaks designed specifically for Itch.io project pages";
  compTitle.textContent = "Pitch";
  if (currViewedComp !== null) {
    currViewedComp.removeClass("viewed");
  }
}

// const sideBar = $(".components-selector-container");

let currViewedComp : JQuery<HTMLElement> = null;

function setCompInfo(comp : string) {
  compTitle.textContent = componentsCollection[comp].name;
  compDesc.textContent = componentsCollection[comp].description;

  compPreview.off("click");
  compPreview.html("");

  compLabelsCont.html("");

  for (const n in componentsCollection[comp].sampleHTML) {
    compPreview.append($(`
      <div class="component-container-single">
        <div class="component-display">
          ${componentsCollection[comp].sampleHTML[n]}
        </div>

        <details class="code-collapse">
          <summary class="button-general">
            <i class="fa-solid fa-code"></i> &nbsp;
            <span class="text-show">Show</span>
            <span class="text-hide">Hide</span>
            HTML
          </summary>
          <button class="comp-copy button-general" data-html-id="${n}">
            <i class="fa-solid fa-copy"></i>
            <span class="comp-copy-text">
              Copy
            </span>
          </button>
        </details>

        <div class="component-html">
          <pre><code>${highlightHTML(componentsCollection[comp].sampleHTML[n])}</code></pre>
        </div>
      </div>
      <br>
    `));

    compPreview.on("click", ".comp-copy", function() {
      copyComponentHTML(
        componentsCollection[comp].sampleHTML[<number>(<unknown>($(this).attr("data-html-id")))],
        $(this).children(".comp-copy-text")[0]
      );
    });
  }

  if (componentsCollection[comp].labels !== undefined) {
    compLabelsCont.append($(`${
      componentsCollection[comp].labels.reduce(function(acc, val) {
        return acc + `<span class="label-${val}">${val.replace(/\-/g, " ")}</span>`
      }, "")
    }`));
  }

  homeButton.toggleClass("hidden", false);
  homePreview.toggleClass("hidden", true);
  compPreview.toggleClass("hidden", false);
}

compileCompBtn.addEventListener("click", () => {
  let selectedComps : string[] = [];

  d.querySelectorAll("input[name='component-toggle']:checked")
    .forEach(function(el) {
      selectedComps.push(el.getAttribute("data-comp"));
  });

  compileComponents(selectedComps, componentsCollection);
});

function calculateComponents() {
  const compSelected = d.querySelectorAll("input[name='component-toggle']:checked");
  compileCompBtn.disabled = compSelected.length <= 0;
  copyNotif.innerText = "";

  for (let n = compSelected.length - 1; n >= 0; n--) {

  }
}

calculateComponents();

initializeComponents();

setHome();

import "./scripts/themes";
import "./scripts/search";