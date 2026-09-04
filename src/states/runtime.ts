import { slug } from "../scripts/slugify";
import { getProject, projectUpdate } from "../storage/db";
import { toast, toastErr } from "../scripts/toast";
import { goToPage } from "./page.svelte";
import { copyStr } from "../scripts/copy";
import { compile } from "../scripts/compiler";

import {
  updateCatSelectionState,
  syncCompCheckedState,
  syncCompGroupItemsClass,
} from "../sidebar/sidebar";

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
      , compHumanName = compData.nameDisplay ?? compData.name
      , compId = slug(compHumanName)
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

              api: {

                openPage() {
                  goToPage({
                    title: compHumanName,
                    content: compData.page,

                    componentData: runtimeData[cat].components[compId] as ComponentRuntimeItem,
                  });
                },

                async toggleInclude(included) {
                  const
                    compRuntimeData = runtimeData[cat].components[compId] as ComponentRuntimeItem
                  ;

                  let
                    updated = false
                  ;

                  try {
                    const
                      // Update the project's DB selection state
                      updates = await projectUpdate(proj => {
                        if (!(cat in proj.components)) {
                          proj.components[cat] = {}
                        }

                        // Delete the key if not checked (not selected), instead of flagging it to false
                        // if (checked) {
                        //   proj.components[catId][compId] = true;
                        // } else {
                        //   delete proj.components[catId][compId];
                        // }

                        // Flag false explicitly if not checked, rather than deleting the key
                        proj.components[cat][compId] = included;
                      })
                    ;

                    // If the DB gets updated...
                    if (updates > 0) {

                      updateCatSelectionState(cat);

                      // Auto copy
                      if (project?.app.settings.app.autoCopy) {
                        copyStr(
                          await compile(),
                        );
                      }

                      // Notify the user about the component's selection state
                      toast(
                        included ?
                          // NOTE: not sure which icon is better :/
                          // `<i class="fa-solid fa-check-to-slot"></i> <b>${compHumanName}</b> added` :
                          `<i class="fa-solid fa-square-check"></i> <b>${compHumanName}</b> added` :
                          `<i class="fa-solid fa-border-none"></i> <b>${compHumanName}</b> removed`
                      );

                      updated = true;

                    } else {

                      // If nothing gets updated...
                      // Notify the user
                      toastErr(
                        included ?
                          `Failed to remove <b>${compHumanName}</b>` :
                          `Failed to add <b>${compHumanName}</b>`
                      );

                    }

                  } catch (err) {
                    toastErr(`${err}`);
                  }

                  if (updated) {

                    syncCompCheckedState(cat, compRuntimeData, included);

                  } else {

                    // Revert back selection state if failed to update
                    compRuntimeData.chkBox.checked = !included;

                  }
                },

                async toggleFavourite(faved) {
                  const
                    compRuntimeData = (runtimeData[cat].components[compId] as ComponentRuntimeItem)
                  ;

                  compRuntimeData.li!.classList.toggle("is-faved", faved);

                  if (compRuntimeData.group) {
                    syncCompGroupItemsClass(
                      runtimeData[cat].components[compRuntimeData.group],
                      "is-faved",
                    );
                  }

                  try {
                    const
                      // Update the project's DB faved state
                      updates = await projectUpdate(proj => {
                        if (faved) {
                          proj.faves[compId] = true;
                        } else {
                          delete proj.faves[compId];
                        }
                      })
                    ;

                    // If the DB gets updated...
                    if (updates > 0) {
                      // Notify the user about the component's favourited state
                      toast(
                        faved ?
                          `<i class="fa-solid fa-star"></i> Added <b>${compHumanName}</b> to favourites` :
                          `<i class="fa-regular fa-star"></i> Removed <b>${compHumanName}</b> from favourites`
                      );
                    } else {
                      // If nothing gets updated...
                      // Notify the user
                      toastErr(
                        faved ?
                          `Failed to remove <b>${compHumanName}</b> from favourites` :
                          `Failed to add <b>${compHumanName}</b> to favourites`
                      );
                    }
                  } catch (err) {
                    toastErr(`${err}`)
                  }
                }
              },
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
