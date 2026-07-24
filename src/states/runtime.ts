import { slug } from "../scripts/slugify";
import { getProject } from "../storage/db";

import compPagesEntry from "../pages/component/imports";

// Simulated itch.io's CSS + ALL of Pitch's components' CSS
import itchCSS from "../styles/_itchio.scss?inline";
export const itchStyling = new CSSStyleSheet();
itchStyling.replaceSync(itchCSS);

export const
  // User's CSS input stylesheet
  inputStyling = new CSSStyleSheet()
, fontLocalStyling: Record<string, CSSStyleSheet> = {}
;

export const
  runtimeData: ComponentRuntimeData = {}

, event = new EventTarget()
, eventCSSCompiled = "css-compiled"

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

const project = await getProject();

export function runtimeDataInit() {

  for (const cat in compPagesEntry) {

    runtimeData[cat] = {
      name: cat,
      components: {},
    };

    compElCache[cat] = {};
    compCheckboxCache[cat] = {};

    for (const page in compPagesEntry[cat]) {
      const
        compData = compPagesEntry[cat][page]
      , compId = slug(compData.nameDisplay ?? compData.name)
      ;

      if (compData.scopes !== "group-only") {

        const
          isWIP = compData.wip

          // Component selected state
        , isChecked = (project?.components[cat])?.[compId] ?? false
        ;

        runtimeData[cat].components[compId] = {

          type: "item",
          manifest: compData,

          ... (
            isWIP ? {

              wip: isWIP,

            } : {

              cssProcessed: "",

              li: null,
              chkBox: null,

              checked: isChecked,

              isFaved: project?.faves[compId] ?? false,
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

          runtimeData[cat].components[compId].group = slug(compData.sub);
        }

      } else {

        runtimeData[cat].components[compId] = {
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
  }
}
