import Prism = require("prismjs");

export function highlightHTML(HTMLCodes : string) : string {
	return Prism.highlight(HTMLCodes, Prism.languages.html, "html");
}