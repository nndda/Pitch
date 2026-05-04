export {};

import type {
  Component,
} from "svelte";

import type {
  StorageAPI,
} from "../states/storage.svelte";

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
  | "singular"
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

  type ComponentPage = Component<{data: ComponentData}>;

  interface ComponentData {
    name: string,
    nameDisplay?: string,

    css?: CSSData,
    page?: () => Promise<ComponentPage>,

    scopes: Record<ScopeStatus | string, Scopes> | "group-only";

    input?: ComponentUserInput[],

    tags?: ComponentTags[],
    notes?: string[],

    sub?: string,

    wip?: true,

    supporterOnly?: true,
  }

  // Runtime data

  type SinglePageEntry = {
    title: string,
    icon: string,
    page: Component | null,
  }

  interface PageEntry {
    [key: string]: ComponentData[],
  }

  type ComponentManifestImports = Record<string, { default: ComponentData }>;

  interface ComponentRuntimeItem {
    type: "item" | "item+group", // not very sure abt the "item+group" implementation tbh...
    css: CSSData,
    cssProcessed: string,

    // name: string,
    // nameDisplay?: string,

    li?: HTMLLIElement,
    chkBox?: HTMLInputElement,

    // page: Component,
    page: () => Promise<ComponentPage>,
    manifest: ComponentData,

    checked: boolean,

    group?: string,
    items?: HTMLLIElement[],

    isFaved: boolean,
    isHacky: boolean,
    isExperimental: boolean,

    tags?: ComponentTags[],

    wip?: true,
  }

  interface ComponentRuntimeItemGroup {
    type: "group",

    name: string,

    li?: HTMLLIElement,

    checkedAll: boolean,

    hasFaved: boolean,
    hasHacky: boolean,
    hasExperimental: boolean,

    items: HTMLLIElement[],
  }

  interface ComponentCategoryData {
    name: string,
    components: {
      [compId: string]: ComponentRuntimeItem | ComponentRuntimeItemGroup,
    },
    selection: StorageAPI<boolean>,
    selectedCountEl?: HTMLElement,
    catSelectBtn?: HTMLButtonElement,
  }

  interface ComponentRuntimeData {
    [catId: string]: ComponentCategoryData,
  }
}
