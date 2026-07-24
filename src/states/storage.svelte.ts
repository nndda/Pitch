export const
  pref: string = "pitchv3__"
, currentProject = initiateStorageFlag<string>("currentProject", "New Project")
;

export function switchContext(ctx: string): void {
  currentProject.set(ctx);
  window.location.href = window.location.href;
}

export interface StorageFlag<T extends string | number | boolean> {
  set: (val: T) => void,
  get: () => T,
}

export function initiateStorageFlag<T extends string | number | boolean>(
  id: string,
  defaultVal: T,
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
