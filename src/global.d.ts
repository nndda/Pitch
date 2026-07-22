declare module "*?css-component" {
  const value: CSSData;
  export default value;
}

declare module "not-a-toast";

declare type RecordString = Record<string, string>;
declare type RecordBoolean = Record<string, boolean>;
declare type RecordUserInput = Record<string, ComponentUserInputValue>;
declare type RecordUserPreviewCodes = Record<string, { html: string, css: string, }>;
