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
    "style",
    "script",
    "svg",
    "link",

    "body",
    "section",
    "article",
    "main",
    "aside",
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
): void {

  function updatePreview(html: string): void {
    const
      HTMLNew: string = sanitizeHTML(html)
    , modified: boolean = htmlInit !== HTMLNew
    ;

    HTMLEditorResetButton.disabled = !modified;

    if (modified) {
      HTMLView.innerHTML = HTMLNew;
    }
  }

  const debouncedUpdatePreview = debounce(updatePreview, 550);

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

export function copyToClipboard(
  html: string,
): void {
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(html).then(() => {

    });
  }
}
