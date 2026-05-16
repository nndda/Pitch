import { EditorView, basicSetup } from "codemirror";
import { html as codemirrorHTML } from "@codemirror/lang-html";
import { css as codemirrorCSS } from "@codemirror/lang-css";
import "./codemirror.scss";

import {
  itchStyling,
  inputStyling,
} from "../../../states/runtime";

import { copyStr } from "../../../scripts/copy";

export let
  view: EditorView
, viewCSS: EditorView
;

import DOMPurify from "dompurify";

DOMPurify.setConfig({
  USE_PROFILES: {
    html: true,
    svg: false,
    mathMl: false,
  },

  FORBID_TAGS: [
    "article",
    "section",
    "aside",
    "nav",
    "main",
    "header",
    "footer",

    "video",
    "track",

    "audio",
    "picture",
    "source",
    "map",
    "area",
    "form",
    "input",
    "label",
    "embed",
    "object",
    "iframe",
    "script",
    "noscript",
    "canvas",
    "template",
    "slot",
    "svg",
    "math",
    "portal",
    "dialog",
    "caption",
    "colgroup",
    "col",
    "menu",
    "data",
    "bdi",
    "bdo",
    "ins",
    "address",

    "html",
    "head",
    "body",
    "title",
    "style",
    "meta",
    "link",
  ],

  ALLOWED_ATTR: [
    "class",
    "style",
    "width",
    "height",
    "alt",
  ],

  ALLOW_ARIA_ATTR: false,
  ALLOW_DATA_ATTR: false,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
});

export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html);
}

import dedent from "dedent";

export function initializeHTML(html: string): string {
  return "\n" + dedent(sanitizeHTML(html)) + "\n";
}

import debounce from "lodash/debounce";

export function instatiateEditor(
  htmlInit: string,
  HTMLView: HTMLElement,
  HTMLEditor: HTMLElement,
  HTMLEditorToggle: HTMLInputElement,
  HTMLEditorResetButton: HTMLButtonElement,
  HTMLCopyButton: HTMLButtonElement,

  cssInit: string,
  cssOverrides: string,

  CSSEditor: HTMLElement,
  CSSEditorResetButton: HTMLButtonElement,
  CSSCopyButton: HTMLButtonElement,
): void {

  // CSS
  const localStyling = new CSSStyleSheet();
  cssInit = "\n" + dedent(cssInit) + "\n";
  localStyling.replaceSync(cssInit);

  const localStylingOverrides = new CSSStyleSheet();
  if (cssOverrides) {
    localStylingOverrides.replaceSync(cssOverrides);
  }

  // HTML
  htmlInit = initializeHTML(htmlInit);

  const shadow = HTMLView.attachShadow({ mode: "open", });
  shadow.adoptedStyleSheets = [
    itchStyling,
    inputStyling,
    localStylingOverrides,
    localStyling,
  ];

  const shadowWrapper = document.createElement("div");
  shadowWrapper.id = "wrapper";

  const shadowHTMLContainer = document.createElement("div");
  shadowWrapper.appendChild(shadowHTMLContainer);

  shadow.appendChild(shadowWrapper);

  shadowHTMLContainer.innerHTML = htmlInit;

  function updatePreview(html: string): void {
    const
      HTMLNew: string = sanitizeHTML(html)
    ;

    HTMLEditorResetButton.disabled = !(htmlInit !== HTMLNew);
    shadowHTMLContainer.innerHTML = HTMLNew;
  }

  function updatePreviewCSS(css: string): void {
    CSSEditorResetButton.disabled = !(cssInit !== css);
    localStyling.replaceSync(css);
  }

  function updateEditor(
    html: string,
  ): void {
    shadowHTMLContainer.innerHTML = html;

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: html,
      },
    });
  }

  function resetEditor(): void {
    updateEditor(htmlInit);
    HTMLEditorResetButton.disabled = true;
  }

  function copyHTML(): void {
    copyStr(
      view
      ? view.state.doc.toString()
      : sanitizeHTML(shadowHTMLContainer.innerHTML)
    );
  }

  HTMLEditorResetButton.addEventListener("click", resetEditor);
  HTMLCopyButton.addEventListener("click", copyHTML);

  const debouncedUpdatePreview = debounce(updatePreview, 160);
  const debouncedUpdateCSS = debounce(updatePreviewCSS, 90);

  HTMLEditorToggle.addEventListener("change", (): void => {

    if (HTMLEditorToggle.checked) {

      view = new EditorView({
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          codemirrorHTML(),

          EditorView.theme({}, {dark: true}),

          EditorView.updateListener.of((update): void => {
            debouncedUpdatePreview(update.state.doc.toString());
          }),
        ],
        parent: HTMLEditor,
        doc: htmlInit,
      });

      viewCSS = new EditorView({
        extensions: [
          basicSetup,
          EditorView.lineWrapping,
          codemirrorCSS(),

          EditorView.theme({}, {dark: true}),

          EditorView.updateListener.of((update): void => {
            debouncedUpdateCSS(update.state.doc.toString());
          }),
        ],
        parent: CSSEditor,
        doc: cssInit,
      });

    } else {
      view.destroy();
      viewCSS.destroy();
    }

  });

}
