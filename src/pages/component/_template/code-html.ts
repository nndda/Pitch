import { EditorView, basicSetup } from "codemirror";
import { html as codemirrorHTML } from "@codemirror/lang-html";
import "./codemirror.scss";

export let
  view: EditorView
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
  HTMLCopyStatus: HTMLElement,
): void {

  function updatePreview(html: string): void {
    const
      HTMLNew: string = sanitizeHTML(html)
    , modified: boolean = htmlInit !== HTMLNew
    ;

    HTMLEditorResetButton.disabled = !modified;
    HTMLView.innerHTML = HTMLNew;
  }

  function resetEditor(): void {
    updateEditor(htmlInit, HTMLView);
    HTMLEditorResetButton.disabled = true;
  }

  function handleCopyError(err: any | DOMException): void {
    HTMLCopyStatus.innerHTML = `unable to copy: ${
      ( err.name || "error" ) + " - " +
      ( err.cause || "unknown" )
    }`;
  }

  function copyHTML(): void {

    HTMLCopyStatus.innerHTML = "copying...";

    try {

      navigator.clipboard.writeText(
        view 
        ? view.state.doc.toString()
        : sanitizeHTML(HTMLView.innerHTML)
      )
      .then((): void => {

        HTMLCopyStatus.innerHTML = "copied!";

      })
      .catch(handleCopyError);

    } catch (err: any) {
      handleCopyError(err);
    }
  }

  HTMLEditorResetButton.addEventListener("click", resetEditor);
  HTMLCopyButton.addEventListener("click", copyHTML);

  const debouncedUpdatePreview = debounce(updatePreview, 550);

  HTMLEditorToggle.addEventListener("change", (): void => {

    if (HTMLEditorToggle.checked) {

      view = new EditorView({
        extensions: [
          basicSetup,
          codemirrorHTML(),

          EditorView.theme({}, {dark: true}),

          EditorView.updateListener.of((update): void => {
            debouncedUpdatePreview(update.state.doc.toString());
          }),
        ],
        parent: HTMLEditor,
        doc: htmlInit,
      });

    } else {
      view.destroy();
    }

  });

}

export function updateEditor(
  html: string,
  HTMLView: HTMLElement,
): void {
  HTMLView.innerHTML = html;

  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: html,
    }
  });
}
