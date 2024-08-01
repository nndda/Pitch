import "./styles/main.scss";

import {
  components,
  PitchComponentData,
  PitchComponentsLibrary,
  PitchComponentsCollection,
} from "./scripts/components";

import { compileComponents } from "./scripts/compile";
import { copyNotif, copyComponentHTML } from "./scripts/copy";
import { highlightHTML } from "./scripts/highlighter";

const d = document;

const compList = $("#components-list");

const compileCompBtn = <HTMLInputElement>d.getElementById("compile-components-btn");

const compTitle = d.getElementById("component-title");
const compDesc = d.getElementById("component-description");

const compPreview = $("#component-preview");

let componentsData : PitchComponentsCollection;

fetch("./components.json")
  .then(response => response.text())
  .then(data => {componentsData = JSON.parse(data);})
  .catch(err => {throw err});

let compGroups : Array<String> = []

function initializeComponents() {
  for (const comp in components) {
    let compData = components[comp];

    if (comp !== "variables") {
      const compName = comp.replace(/\-/g, " ");
      const compID = "comp-" + comp;

      if (!compGroups.includes(compData["type"])) {
        compGroups.push(compData["type"]);
        const compElemGroup = $(`
          <dt>
            <span class="component-type-title">
              ${compData["type"]}
            </span>

            <button class="button-general component-select-all">
              <span class="btn-icon material-symbols-outlined">
                grid_view
              </span>
            </button>

            <button class="button-general component-select-none">
              <span class="btn-icon material-symbols-outlined">
                square
              </span>
            </button>

          </dt>
        `);
        compElemGroup.on("click", ".component-select-all", function() {
          d.querySelectorAll(`[data-type="${compData["type"]}"]`).forEach(function(el : HTMLInputElement) {
            el.checked = true;
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

      compElemItem.on("input", "input", function() {
        calculateComponents();
      });

      compElemItem.on("click", "button.component-toggle", function() {
        setCompInfo(comp);
      });

      compList.append(compElemItem);
    }
  }
}

const homeButton = $("#home-button");
const homeContent = $("#home-content");

homeButton.on("click", function() {
  homeContent.toggleClass("hidden", false);
  homeButton.toggleClass("hidden", true);
  compPreview.html("");
  compDesc.textContent = "";
  compTitle.textContent = "Pitch";
});

function setCompInfo(comp : string) {
  compTitle.textContent = comp.replace(/\-/g, " ");
  compDesc.textContent = components[comp].desc;
  compPreview.off("click");
  compPreview.html("");

  for (const n in components[comp].sampleHTML) {
    compPreview.append($(`
      <div class="component-container-single">
        <div class="component-display">
          ${components[comp].sampleHTML[n]}
        </div>

        <details class="code-collapse">
          <summary class="button-general">
            <i class="fa-solid fa-code"></i> &nbsp;
            Show HTML
          </summary>
          <button class="comp-copy button-general" data-html-id="${n}">
            <i class="fa-solid fa-copy"></i>
            <span class="comp-copy-text">
              Copy
            </span>
          </button>
        </details>

        <div class="component-html">
          <pre><code>${highlightHTML(components[comp].sampleHTML[n])}</code></pre>
        </div>
      </div>
      <br>
    `));

    compPreview.on("click", ".comp-copy", function() {
      copyComponentHTML(
        components[comp].sampleHTML[<number>(<unknown>($(this).attr("data-html-id")))],
        $(this).children(".comp-copy-text")[0]
      );
    });
  }


  homeButton.toggleClass("hidden", false);
  homeContent.toggleClass("hidden", true);
}

compileCompBtn.addEventListener("click", () => {
  let selectedComps : Array<string> = [];

  d.querySelectorAll("input[name='component-toggle']:checked")
    .forEach(function(el) {
      selectedComps.push(el.getAttribute("data-comp"));
  });

  compileComponents(selectedComps, componentsData);
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

import "./scripts/search";
// initializeSearchFunction();