export function initSearch(d: Document, cb: () => void): () => void {
  // This will not scales well :/
  const filterFave: HTMLInputElement = d.getElementById("component-filter-fave") as HTMLInputElement;
  const filterExp: HTMLInputElement = d.getElementById("component-filter-experimental") as HTMLInputElement;

  // const compsListEl: NodeListOf<Element> = d.querySelectorAll("#components-list>dd");

  filterFave.checked = localStorage.getItem("pitchIsFaveFiltered") === "-";
  filterExp.checked = localStorage.getItem("pitchIsExpFiltered") === "-";

  // This doesn't feels right...
  const updateState: () => void = (): void => {
    search(
      d.querySelectorAll("#components-list>dd"),
      filterFave.checked,
      filterExp.checked,
    );

    localStorage.setItem("pitchIsFaveFiltered", filterFave.checked ? "-" : "");
    localStorage.setItem("pitchIsExpFiltered", filterExp.checked ? "-" : "");

    cb();
  };

  filterFave.addEventListener("input", updateState);
  filterExp.addEventListener("input", updateState);

  return updateState;
}

function search(compsListEl: NodeListOf<Element>, isFaved: boolean, isExp: boolean): void {
  for (let n = compsListEl.length - 1; n >= 0; n--) {
    const compElClasses: DOMTokenList = compsListEl[n].classList;

    compElClasses.toggle(
      "hidden",
      (!compElClasses.contains("is-faved") && isFaved) ||
      (!compElClasses.contains("is-exp") && isExp)
    );
  }
}

/*
const searchItems: JQuery<HTMLInputElement> = $("#components-list > dd");
const searchBox: JQuery<HTMLInputElement> = $("#component-search");
export const searchClearBtn: JQuery<HTMLButtonElement> = $("#component-search-clear");

searchClear();

searchClearBtn.on("click", () => {
  searchClear();
});

searchBox.on("input", () => {
  searchComp();
});

function searchClear(): void {
  searchBox.val("");
  searchComp();
}

function searchComp(): void {
  const searchTerm: string = searchBox.val().toLowerCase();
  if (searchTerm != "") {
    searchClearBtn.removeAttr("disabled");
    searchItems.each(() => {
      $(this).toggleClass("hidden",
        !($(this).attr("data-search").indexOf(searchTerm) !== -1)
      );
    });
  } else {
    searchItems.toggleClass("hidden", false);
    searchClearBtn.attr("disabled", "");
  };
}
*/