export {};

import type { Component } from "svelte";
import { cat, scopes, scopeStatus, tags } from "@pitch/meta";

declare global {

  const Itch: any; /* Itch API injected via official CDN/itch app */

  const COMMIT_HASH: string;
  const COMMIT_DATE: string;
  const VERSION: string;

  // Generic page data
  interface PageData {
    title: string,

    content?: () => Promise<Component | ComponentPage>,

    componentData?: ComponentRuntimeItem,

    icon?: string,
    attr?: any,

    subPages?: PageData[],
  }


  interface CSSData {
    raw: string,
    compressed: string,

    fontFaces: {
      raw: string,
      compressed: string,
    },
  }

  type ComponentCategory = typeof cat[number];

  type Scope = typeof scopes[number];
  type ScopeStatus = typeof scopeStatus[number];
  type Scopes = Scope | Scope[];

  type ComponentTags = typeof tags[number];

  // TODO:
  // type BrowsersCompatStatus = "full" | "limited" | "none";
  // type BrowsersCompat = Record<"firefox" | "safari" | "chrome", BrowsersCompatStatus>;

  type ComponentUserInputValue = string;

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
    | "url"
    | "size"
    | {
        min: number,
        max: number,
        step?: number,
      }
    ,

    default?: ComponentUserInputValue,
    defaultFormat?:
      "em"
    | "rem"
    | "px"
    ,
    // TODO:
    // defaultDynamic?: () => string,

    // cssInjectPre?: (value: ComponentUserInputValue) => string,
    // cssInjectPost?: (value: ComponentUserInputValue) => string,
    // cssMutate?: (value: ComponentUserInputValue, css: string) => string,

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

  type ComponentPage = Component<{data?: ComponentData}>;

  interface ComponentData {
    name: string,
    nameDisplay?: string,

    css: CSSData,
    page?: () => Promise<ComponentPage>,

    scopes:
      Record<ScopeStatus | string, Scopes>
    | "group-only"
    ;
    // i hate amp
    // TODO: merge AMP to `scopes`
    scopeAMPincompatible?: true,

    // Force disallow comment section from using the component
    disallowCommentSection?: true,

    input?: ComponentUserInputItem[],
    compatibleOnInputs?: string[],

    // browsersCompat?: BrowsersCompat,

    tags?: ComponentTags[],
    notes?: string[],

    sub?: string,

    wip?: true,

    flavour?: true,

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

    li: HTMLLIElement,
    chkBox: HTMLInputElement,

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

  interface ComponentRuntimeItem {
    wip: undefined,

    api?: {
      openPage(): void,

      toggleInclude(included: boolean): Promise<void>,
      toggleFavourite(faved: boolean): Promise<void>,
    },
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
    name: ComponentCategory,

    components: {
      [compId: string]: ComponentRuntimeItem | ComponentRuntimeItemGroup,
    },

    selectedCountEl?: HTMLElement,
    catSelectBtn?: HTMLButtonElement,
  }

  interface ComponentRuntimeData {
    [catId: string]: ComponentCategoryData,
  }
}
