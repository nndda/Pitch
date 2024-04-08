import "./styles/main.scss";
import { components, PitchComponentData } from "./scripts/components";
import { compileComponents } from "./scripts/compile";

const d = document;
let compInputs : Array<HTMLInputElement> = [];

const compileCompBtn = <HTMLInputElement>d.getElementById("compile-components-btn");

// components.forEach(comp => {
for (const comp in components) {
  const compName = comp.replace(/\-/g, " ");
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

  compInput.addEventListener("change", () => {calculateComponents()});

  d.getElementById("components-toggles").appendChild(compInput);
  d.getElementById("components-toggles").appendChild(compLabel);

  compInputs.push(compInput);
// });
}

compileCompBtn.addEventListener("click", () => {
  let selectedComps : Array<string> = [];
  compInputs.forEach(inp => {
    if (inp.checked)
      selectedComps.push(inp.getAttribute("data-comp"));
  });
  compileComponents(selectedComps);
});
calculateComponents();

function getCompScope(): string {
  return (<HTMLInputElement>d.querySelector("input[name='']:checked")).value;
}

function calculateComponents() {
  const compSelected = d.querySelectorAll("input[name='component-toggle']:checked");
  compileCompBtn.disabled = compSelected.length <= 0;
  for (let n = compSelected.length - 1; n >= 0; n--) {

  }
}