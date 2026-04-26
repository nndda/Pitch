export {};

declare global {

  type Scope =
    "project"
  | "profile"
  | "jam"
  | "devlog"
  ;
  type ScopeStatus =
    "compatible"
  | "partial"
  | "none"
  ;
  type Scopes = Scope | Scope[];

  type ComponentTags =
    "hacky"
  | "experimental"
  ;

  type ComponentUserInputValue = string | number;

  interface ComponentUserInput {
    name: string,
    var: string,
    default?: string | number,
    type:
      "string"
    | "int"
    | "color"
    | {
        min: number,
        max: number,
      }
    ,

    cssInject?: (inputValue: ComponentUserInputValue) => string,
    required?: true,
    hardcoded?: true,
  }

  interface CSSData {
    raw: string,
    compressed: string,
  }

  interface ComponentData {
    name: string,
    nameDisplay?: string,

    css?: CSSData,

    scopes: Record<ScopeStatus | string, Scopes> | "group-only";

    input?: ComponentUserInput[],

    tags?: ComponentTags[],
    notes?: string[],

    sub?: string,
  }

}
