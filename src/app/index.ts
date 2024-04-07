import { components } from "./scripts/components";
import { compileComponents } from "./scripts/compile";

const d = document;
let compInputs : Array<HTMLInputElement> = [];

components.forEach(comp => {
  const compName = comp.replace(/\-/g, " ");
  const compID = "comp-" + comp;
  const compInput = d.createElement("input");
  [
    ["type", "checkbox"],
    ["name", compID],
    ["id", compID],
    ["data-comp", comp],
  ].forEach(attr => {
    compInput.setAttribute(attr[0], attr[1]);
  });

  const compLabel = d.createElement("label");
  compLabel.setAttribute("for", compID);
  compLabel.setAttribute("class", "component-toggle");
  compLabel.textContent = compName;
  compLabel.appendChild(compInput);

  d.getElementById("components-toggles").appendChild(compLabel);

  compInputs.push(compInput);
});

d.getElementById("compile-components-btn").addEventListener("click", () => {
  let selectedComps : Array<string> = [];
  compInputs.forEach(inp => {
    if (inp.checked)
      selectedComps.push(inp.getAttribute("data-comp"));
  });
  console.log(
    compileComponents(selectedComps)
  );
});