const pref: string = "pitchv3__";

type StorageAPIUpdate<T> = (
  id: string,
  is: T,
) => void

export interface StorageAPI<T> {
  state: Record<string, T>,
  update: StorageAPIUpdate<T>,
  flush: () => void,
}

export function initiateStorageAPI<T>(
  storageId: string,
): StorageAPI<T> {

  storageId = pref + storageId;

  type StorageData = Record<string, T>;

  let
    localData: StorageData = {}
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
      console.warn(`Unknown error when parsing local '${storageId}' data.`)
    }

  }

  const
    storageObject: StorageData = $state(localData)
  ;

  function updateFn(
    id: string,
    is: T,
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

  return {
    state: storageObject,

    update: updateFn,
    flush: flushFn,
  };
}

export const compsUserInputStorage = initiateStorageAPI<ComponentUserInputValue>("comp-user-input");

export type BooleanRecord = Record<string, boolean>

export interface BooleanStorageAPI {
  state: BooleanRecord,
  update: (
    id: string,
    is: boolean,
  ) => void,
  updateAll: () => void,
}

export function initiateBooleanStorageAPI(
  storageId: string,
): BooleanStorageAPI {
  let localData: BooleanRecord = {};

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
      console.warn(`Unknown error when parsing local '${storageId}' data.`)
    }

  }

  const
    storageObject: BooleanRecord = $state(localData)
  ;

  return {
    state: storageObject,

    update: (
      id: string,
      is: boolean,
    ): void => {
      storageObject[id] = is;
      localStorage.setItem(
        storageId,
        JSON.stringify(storageObject),
      );
    },

    updateAll: (): void => {
      localStorage.setItem(
        storageId,
        JSON.stringify(storageObject),
      );
    },
  };
}
