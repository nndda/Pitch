import {
  slug,
  createCompIdFunc,
} from "../scripts/slugify";

import {
  initiateStorageAPI,
  compsUserInputStorage,
} from "../states/storage.svelte";

function getCompsManifest(
  imports: ComponentManifestImports,
): ComponentData[] {
  return Object.entries(imports).map((
    [
      _,
      mod,
    ]
  ) => mod.default);
}

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

  }
;
export function runtimeDataInit(): void {
  const
    favesState = initiateStorageAPI<boolean>("faves")
  , compPagesEntry: PageEntry = {

      Components: getCompsManifest( import.meta.glob("/pages/component/components/*.ts", { eager: true, }) as ComponentManifestImports ),
      Decorations: getCompsManifest( import.meta.glob("/pages/component/decorations/*.ts", { eager: true, }) as ComponentManifestImports ),

    }
  ;

  for (const cat in compPagesEntry) {

    const
      catId = "cat-" + slug(cat)
    , slugifyId = createCompIdFunc(catId)
    ;

    runtimeData[catId] = {
      name: cat,
      components: {},
      selection: initiateStorageAPI<boolean>(`comps-${catId}`),
      // selectedCountEl: null,
      // catSelectBtn: null,
    };

    compElCache[catId] = {};
    compCheckboxCache[catId] = {};

    for (const page in compPagesEntry[cat]) {
      const
        compData = compPagesEntry[cat][page]
      , compId = slugifyId(compData.name)
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

              isFaved: favesState.state[compId] ?? false,
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

          runtimeData[catId].components[compId].group = slugifyId(compData.sub);
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
    compsUserInputStorage.flush();
  }
}
