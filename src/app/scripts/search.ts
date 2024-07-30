const searchItems = $("#components-list > dd");
const searchBox : JQuery<HTMLInputElement> = $("#component-search");
export const searchClearBtn : JQuery<HTMLButtonElement> = $("#component-search-clear");

searchClear();

searchClearBtn.on("click", function() {
	searchClear();
});

searchBox.on("input", function() {
	searchComp();
});

function searchClear() {
	searchBox.val("");
	searchComp();
}

function searchComp() {
	let searchTerm = searchBox.val().toLowerCase();
	if (searchTerm != "") {
		searchClearBtn.removeAttr("disabled");
		searchItems.each(function() {
			$(this).toggleClass("hidden",
				!($(this).attr("data-search").indexOf(searchTerm) !== -1)
			);
		});
	} else {
		searchItems.toggleClass("hidden", false);
		searchClearBtn.attr("disabled", "");
	};
}