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