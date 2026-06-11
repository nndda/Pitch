import { slug } from "../scripts/slugify";

import compPagesEntry from "../pages/component/imports";

import {
  initiateStorageAPI,

  faves,
  inputs,

  type RecordBoolean,
} from "../states/storage.svelte";

import itchCSS from "../styles/_itchio.scss?inline";
export const itchStyling = new CSSStyleSheet();
itchStyling.replaceSync(itchCSS);

export const
  inputStyling = new CSSStyleSheet()
, fontLocalStyling: Record<string, CSSStyleSheet> = {}
;

export const
  runtimeData: ComponentRuntimeData = {}

, compCheckboxCache: Record<string, Record<string, HTMLInputElement>> = {}
, compElCache: Record<string, Record<string, HTMLLIElement>> = {}

, catMeta: Record<string, { icon: string, }> = {
    Components: {
      icon: "fa-solid fa-bars-progress",
    },
    Decorations: {
      icon: "fa-solid fa-paint-roller",
    },
    Tweaks: {
      icon: "fa-solid fa-pen-ruler",
    },
  }
;

export function runtimeDataInit(): void {

  for (const cat in compPagesEntry) {
    const
      catId = "cat-" + slug(cat)
    ;

    runtimeData[catId] = {
      name: cat,
      components: {},
      selection: initiateStorageAPI<RecordBoolean>(`${catId}`),

      // selectedCountEl: null,
      // catSelectBtn: null,
    };

    compElCache[catId] = {};
    compCheckboxCache[catId] = {};

    for (const page in compPagesEntry[cat]) {
      const
        compData = compPagesEntry[cat][page]
      , compId = slug(compData.nameDisplay ?? compData.name)
      ;

      if (compData.scopes !== "group-only") {

        const
          isWIP = compData.wip
        ;

        // Component selected state
        runtimeData[catId].selection.state[compId] ??= false;

        runtimeData[catId].components[compId] = {

          type: "item",
          manifest: compData,

          ... (
            isWIP ? {

              wip: isWIP,

            } : {

              cssProcessed: "",

              li: null,
              chkBox: null,

              checked: runtimeData[catId].selection.state[compId],

              isFaved: faves.state[compId] ?? false,
              isHacky: compData.tags?.includes("hacky") ?? false,
              isExperimental: compData.tags?.includes("experimental") ?? false,

            }
          ),

        } as ComponentRuntimeItem;

        if (compData.sub) {
          // runtimeData[catId].components[compId] = {
          //   ... runtimeData[catId].components[compId],

          //   // type: "item+group",
          //   group: slugifyId(compData.sub),
          // };

          runtimeData[catId].components[compId].group = slug(compData.sub);
        }

      } else {

        runtimeData[catId].components[compId] = {
          type: "group",

          name: compData.name,

          checkedAll: false,

          hasFaved: false,
          hasHacky: false,
          hasExperimental: false,

          items: [],

        } as ComponentRuntimeItemGroup;

      }

    }

    runtimeData[catId].selection.flush();
    inputs.flush();
  }
}
