import "./styles/main.scss";
import {
  // components,
  PitchComponentData,
  PitchComponentsLibrary,
  PitchComponentsCollection,
} from "./scripts/components";
import { compileComponents } from "./scripts/compile";
import { copyNotif } from "./scripts/copy";

const d = document;
let compInputs : Array<HTMLInputElement> = [];

const compSelectAllBtn = d.getElementById("btn-select-all");
const compSelectNoneBtn =  d.getElementById("btn-select-none");

const compileCompBtn = <HTMLInputElement>d.getElementById("compile-components-btn");

const compTitle = d.getElementById("component-title");
const compDesc = d.getElementById("component-description");

const compPreviewSelector = <HTMLSelectElement>d.getElementById("component-info-selector");
const compPreview = d.getElementById("component-preview");

let componentsData : PitchComponentsCollection;

fetch("./components.json")
  .then(response => response.text())
  .then(data => {
    componentsData = JSON.parse(data);
    // console.log(componentsData);
    initializeComponents();
  })
  .catch(err => {throw err});

function initializeComponents() {
  let compPreviewCSS = d.createElement("style");

  for (const comp in componentsData) {
    let compData = componentsData[comp];

    if (compData.name !== "variables") {
      const compName = compData.name.replace(/\-/g, " ");
      const compID = "comp-" + comp;
      const compInput = d.createElement("input");
      [
        ["type", "checkbox"],
        ["name", "component-toggle"],
        ["id", compID],
        ["data-comp", comp],
      ].forEach(attr => {
        compInput.setAttribute(attr[0], attr[1]);
      });

      const compLabel = d.createElement("label");
      compLabel.setAttribute("for", compID);
      compLabel.setAttribute("class", "component-toggle");
      compLabel.textContent = compName;

      compInput.addEventListener("input", () => {calculateComponents()});

      compLabel.addEventListener("mouseover", () => {
        compPreviewSelector.value = compInput.getAttribute("data-comp");
        setCompInfo(compPreviewSelector.value);
      });

      d.getElementById("components-toggles").appendChild(compInput);
      d.getElementById("components-toggles").appendChild(compLabel);

      compInputs.push(compInput);

      const compInfoOpt = d.createElement("option");
      compInfoOpt.setAttribute("value", comp);
      compInfoOpt.innerText = compName;

      if (compName === "accordion") compInfoOpt.setAttribute("selected", "");

      compPreviewSelector.appendChild(compInfoOpt);

      compPreviewCSS.innerText += compData.css;
    }
  }
  compPreviewSelector.addEventListener("input", () => {
    setCompInfo(compPreviewSelector.value);
  });

  document.head.appendChild(compPreviewCSS);
}

function setCompInfo(comp : string) {
  compTitle.textContent = componentsData[comp].name.replace(/\-/g, " ");
  compDesc.textContent = componentsData[comp].desc;
  compPreview.innerHTML = componentsData[comp].sampleHTML;
}

compSelectAllBtn.addEventListener("click", () => {
  for (let n = compInputs.length - 1; n >= 0; n--) {
    compInputs[n].checked = true;
  }
  calculateComponents();
});

compSelectNoneBtn.addEventListener("click", () => {
  for (let n = compInputs.length - 1; n >= 0; n--) {
    compInputs[n].checked = false;
  }
  calculateComponents();
});


compileCompBtn.addEventListener("click", () => {
  let selectedComps : Array<string> = [];
  compInputs.forEach(inp => {
    if (inp.checked)
      selectedComps.push(inp.getAttribute("data-comp"));
  });
  compileComponents(selectedComps, componentsData);
});
calculateComponents();

function getCompScope(): string {
  return (<HTMLInputElement>d.querySelector("input[name='']:checked")).value;
}

function calculateComponents() {
  const compSelected = d.querySelectorAll("input[name='component-toggle']:checked");
  compileCompBtn.disabled = compSelected.length <= 0;
  copyNotif.innerText = "";

  for (let n = compSelected.length - 1; n >= 0; n--) {

  }
}