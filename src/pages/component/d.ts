declare global {

  type Scope = "project" | "profile" | "jam" | "devlog";
  type Scopes = Scope | Scope[];

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

    scopes: {
      compatible?: Scopes,
      partial?: Scopes,
      none?: Scopes,
    },

    input?: ComponentUserInput[],
    inputVars?: ComponentUserInputVarsModifier[],
  }

}