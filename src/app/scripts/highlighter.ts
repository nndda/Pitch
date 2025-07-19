import { highlight, languages } from "prismjs";

export function highlightHTML(HTMLCodes: string): string {
	return highlight(HTMLCodes, languages.html, "html");
}

export function highlightCSS(CSSCodes: string): string {
	return highlight(CSSCodes, languages.css, "css");
}