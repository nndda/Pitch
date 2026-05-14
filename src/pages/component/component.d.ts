export {};

import type {
  Component,
} from "svelte";

import type {
  RecordBoolean,
  StorageAPIWithContext,
} from "../states/storage.svelte";

declare global {

  const Itch: any; /* Itch API injected via official CDN/itch app */

  interface CSSData {
    raw: string,
    compressed: string,
  }

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
  | "only"
  ;
  type Scopes = Scope | Scope[];

  type ComponentTags =
    "hacky"
  | "experimental"
  | "singular"
  ;

  type BrowsersCompatStatus = "full" | "limited" | "none";
  type BrowsersCompat = Record<"firefox" | "safari" | "chrome", BrowsersCompatStatus>;

  type ComponentUserInputValue = string | number;

  type ComponentUserInputItem =
    ComponentUserInput
  | ComponentUserInputHeading
  | ComponentUserInputCollapseMark
  ;

  interface ComponentUserInput {
    name: string,
    var: string,

    type:
      "string"
    | "int"
    | "color"
    | {
        min: number,
        max: number,
        step?: number,
      }
    ,

    default?: ComponentUserInputValue,
    defaultDynamic?: () => string,

    cssInjectPre?: (value: ComponentUserInputValue) => string,
    cssInjectPost?: (value: ComponentUserInputValue) => string,
    cssMutate?: (value: ComponentUserInputValue, css: string) => string,

    required?: true,
    hardcoded?: true,
  }
  interface ComponentUserInputCollapseMark {
    collapse: true,
  }
  interface ComponentUserInputHeading {
    heading: string,
    icon?: string,
  }

  type ComponentPage = Component<{data: ComponentData}>;

  interface ComponentData {
    name: string,
    nameDisplay?: string,

    css?: CSSData,
    page?: () => Promise<ComponentPage>,

    scopes:
      Record<ScopeStatus | string, Scopes>
    | "group-only"
    ;

    input?: ComponentUserInputItem[],
    compatibleOnInputs?: string[],

    browsersCompat?: BrowsersCompat,

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

    li?: HTMLLIElement,
    chkBox?: HTMLInputElement,

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

    selection: StorageAPIWithContext<RecordBoolean>,
    selectedCountEl?: HTMLElement,
    catSelectBtn?: HTMLButtonElement,
  }

  interface ComponentRuntimeData {
    [catId: string]: ComponentCategoryData,
  }
}
