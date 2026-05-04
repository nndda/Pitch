import {
  runtimeData,
} from "../states/runtime";

export function updateCatSelectionState(catId: string): void {
  let
    selected: number = 0
  , total: number = 0

  , selectedVisible: number = 0
  , totalVisible: number = 0
  ;

  const
    catData = runtimeData[catId]
  , selectEl = catData.catSelectBtn!
  ;

  for (const compId in catData.components) {
  // for (const compId in catData.selection.state) {
    const isVisible = catData.components[compId].li!.checkVisibility();

    total += 1;

    if (isVisible) {
      totalVisible += 1;
    }

    // if (catData.selection.state[compId]) {
    //   selected += 1;
    // };

    // TODO: i feel like there's better pattern
    if ("chkBox" in catData.components[compId]) {
      const checked = catData.components[compId].chkBox!.checked;

      if (checked) {
        selected += 1

        if (isVisible) {
          selectedVisible += 1;
        }
      }
    }
  }

  // TODO: optimize attributes logic
  selectEl.setAttribute("aria-label", "Clear selection");
  selectEl.setAttribute("data-status", "select-none");

  if (selectedVisible == 0) { // select all
    // button is 'empty square'
    selectEl.setAttribute("data-status", "select-all");
    selectEl.setAttribute("aria-label", "Select All");

    selectEl.setAttribute("data-icon", "fa-square");

  } else if (selectedVisible === totalVisible) { // clear all selections
    // button is 'checkmark square'
    selectEl.setAttribute("data-icon", "fa-square-check");

  } else { // also clear all selection(s)
    // button is 'minus square'
    selectEl.setAttribute("data-icon", "fa-square-minus");

  }

  catData.selectedCountEl!.textContent = `${selected}`;
  catData.selection.flush();
}

export function syncCompCheckedState(
  catId: string,
  compRuntimeData: ComponentRuntimeItem | ComponentRuntimeItemGroup,
  checked: boolean,
): void {
  if ("group" in compRuntimeData && compRuntimeData.group) {
    const
      compGroupData = runtimeData[catId].components[compRuntimeData.group]
    ;
    if (compGroupData.type === "item") {
      const
        chkBox = compGroupData.chkBox!
      ;
      if (!chkBox.checked) {
        chkBox.checked = checked;
      }

      chkBox.disabled = checked;
    }
  }
}

export function syncCompGroupItemsClass(
  compGroupData: ComponentRuntimeItem | ComponentRuntimeItemGroup,
  className: string,
): void {
  const hasAnyClass = compGroupData.items!.some(el => {
    return el.classList.contains(className)
  });

  if (className === "is-faved") {
    compGroupData.li!.classList.toggle(
      "has-faved",
      hasAnyClass,
    );

    return;
  }

  compGroupData.li!.classList.toggle(
    className,
    hasAnyClass,
  );
}

// TODO: find a way to not hardcode the version
// sometimes it unables to import package.json :/
// also this method below brings/import the whole content of package.json too
// import pkg from "../../package.json";
// export const pitchVer: string = pkg.version;
export const pitchVer: string = "3.0.0";
