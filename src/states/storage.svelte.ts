export interface ItchProfile {
  username: string,
  cover_url: string,
  url: string,
  // developer: boolean,
  // gamer: boolean,
  // press_user: boolean,
  // id: number,
  display_name: string,
}

export type RecordString = Record<string, string>;
export type RecordBoolean = Record<string, boolean>;
export type RecordUserInput = Record<string, ComponentUserInputValue>;
export type RecordUserPreviewCodes = Record<string, { html: string, css: string, }>;

export const
  pref: string = "pitchv3__"

, currentProject = initiateStorageFlag<string>("currentProject", "New project")

, ui = initiateStorageAPI<{

    toc_collapsed: boolean,

    [key: string]: boolean,

  }>("ui", true)

, projects = initiateStorageAPI<{

    [key: string]: {
      name: string,
      url?: string,
      scope: Scope,
      theme_text?: string,
      theme_link?: string,
      theme_bg?: string,
      theme_font?: string,
    },

  }>("projects", true)

, user = initiateStorageAPI<ItchProfile>("user", true)

, settings = initiateStorageAPI<{

    // CSS
    minify: boolean,
    use_layer: boolean,
    isolate_comment_section: boolean,

    // App
    auto_copy: boolean,
    show_home_tips: boolean,
    show_selected_count: boolean,
    show_faved_badge: boolean,
    category_action_on_hover: boolean,

  }>("faves")

, theme = initiateStorageAPI<{

    text_col: string,
    link_col: string,
    background: string,
    background_2: string,

    // background_opacity: number,

    font_family: string,

  }>("theme")

, faves = initiateStorageAPI<RecordBoolean>("faves")
, inputs = initiateStorageAPI<RecordUserInput>("inputs")
, codes = initiateStorageAPI<RecordUserPreviewCodes>("codes")
;

export function switchContext(ctx: string): void {
  currentProject.set(ctx);
  window.location.href = window.location.href;
}

type StorageAPIUpdate<
  T extends object
> = <K extends keyof T>(
  id: K,
  is: T[K],
) => void;

export interface StorageAPI<T extends object> {
  state: T,
  update: StorageAPIUpdate<T>,
  merge: (data: Partial<T>) => void,
  destroy: () => void,
  flush: () => void,
}
export interface StorageAPIWithContext<T extends object> extends StorageAPI<T> {
  changeContext: (ctx: string) => void,
  duplicateLocal:  (ctx: string) => void,
}

export function initiateStorageAPI<T extends object>(storageId: string, global: true): StorageAPI<T>
export function initiateStorageAPI<T extends object>(storageId: string, global?: false): StorageAPIWithContext<T>
export function initiateStorageAPI<T extends object>(
  storageId: string,
  global: boolean = false,
): StorageAPI<T>
 | StorageAPIWithContext<T>
{

  const storageIdInit = storageId;

  function constructId(ctx: string): string {
    return pref + (global ? "" : ctx + "__") + storageIdInit;
  }

  storageId = constructId(currentProject.get() ?? "");

  let
    localData = {} as T
  ;

  try {

    const localDataRaw: string = localStorage.getItem(storageId) ?? "";
    localData = localDataRaw ? JSON.parse(localDataRaw) : {};

  } catch (err) {

    if (err instanceof SyntaxError) {
      console.error(
        "SyntaxError: ",
        "\nmessage: ", err.message,
        "\nstack: ", err.stack,
      )
    } else {
      console.warn(`Unknown error when parsing local '${storageId}' data.`);
    }

  }

  const
    storageObject: T = $state(localData)
  ;

  if (Object.keys(storageObject).length === 0) {
    localStorage.setItem(storageId, JSON.stringify(storageObject));
  }

  function updateFn<
    K extends keyof T
  >(
    id: K,
    is: T[K],
  ): void {
    storageObject[id] = is;
    flushFn();
  }

  function flushFn(): void {
    localStorage.setItem(
      storageId,
      JSON.stringify(storageObject),
    );
  }

  function mergeFn(data: Partial<T>): void {
    Object.assign(storageObject, data);
  }

  function destroyFn(): void {
    for (const key in storageObject) {
      delete storageObject[key];
    }

    localStorage.removeItem(storageId);
  }

  if (!global) {
    function duplicateLocalFn(ctx: string) {
      localStorage.setItem(
        constructId(ctx),
        JSON.stringify(storageObject),
      );
    }

    function changeContextFn(ctx: string) {
      localStorage.removeItem(storageId);
      duplicateLocalFn(ctx);
    }

    return {
      state: storageObject,

      update: updateFn,
      merge: mergeFn,

      flush: flushFn,
      destroy: destroyFn,

      changeContext: changeContextFn,
      duplicateLocal: duplicateLocalFn,
    } as StorageAPIWithContext<T>;
  }

  return {
    state: storageObject,

    update: updateFn,
    merge: mergeFn,

    flush: flushFn,
    destroy: destroyFn,
  } as StorageAPI<T>;
}

export interface StorageFlag<T extends string | number | boolean> {
  set: (val: T) => void,
  get: () => T | null,
}

export function initiateStorageFlag<T extends string | number | boolean>(
  id: string,
  defaultVal: T | null = null,
  session: boolean = false,
): StorageFlag<T> {
  id = pref + id;

  const storage = (session ? sessionStorage : localStorage)

  return {
    set: (val: T) => {
      storage.setItem(id, JSON.stringify(val));
    },

    get: () => {
      let localData : T | null = null;

      try {

        const localDataRaw: string = storage.getItem(id) ?? "";
        localData = localDataRaw ? JSON.parse(localDataRaw) : null;

      } catch (err) {

        if (err instanceof SyntaxError) {
          console.error(
            "SyntaxError: ",
            "\nmessage: ", err.message,
            "\nstack: ", err.stack,
          )
        } else {
          console.warn(`Unknown error when parsing local '${id}' data.`);
        }

      }

      if (localData) {
        return localData;
      }

      if (defaultVal) {
        storage.setItem(id, JSON.stringify(defaultVal));
      }

      return defaultVal;
    }
  }
}
