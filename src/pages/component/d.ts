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

  interface ComponentUserInput {
    name: string,
    id: string,
    default?: string,
    type: "string",
  }

  interface ComponentUserInputVarsModifier {
    selector: string,
    vars: Record<string, string>,
  }

  interface ComponentData {
    name: string,
    nameDisplay?: string,

    scopes: Record<ScopeStatus | string, Scopes>;

    input?: ComponentUserInput[],
    inputVars?: ComponentUserInputVarsModifier[],

    tags?: ComponentTags[],
    notes?: string[],
  }

}