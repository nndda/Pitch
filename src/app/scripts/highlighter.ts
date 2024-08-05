const Prism = require("prismjs");

export function highlightHTML(HTMLCodes : string) : string {
	return <string>Prism.highlight(HTMLCodes, Prism.languages.html, "html");
}