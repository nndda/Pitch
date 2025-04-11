const pitchCompsKey: string = "pitchComps";

export const pitchComp: any = localStorage.getItem(pitchCompsKey) !== null
  ? JSON.parse(localStorage.getItem(pitchCompsKey))
  : {}
;

export function getCompLocalData(name: string, key: string): any {
  const item: any = localStorage.getItem(pitchCompsKey);

  if (item === null || item === undefined) {
    return null;
  }

  const itemObj: any = JSON.parse(item);

  if (!Object.prototype.hasOwnProperty.call(itemObj, name)) {
    return null;
  }
  if (!Object.prototype.hasOwnProperty.call(itemObj[name], key)) {
    return null;
  }

  return itemObj[name][key];
}

export function setCompLocalData(name: string, data: any): void {
  if (!Object.prototype.hasOwnProperty.call(pitchComp, name)) {
    pitchComp[name] = {};
  }

  for (const key in data) {
    pitchComp[name][key] = data[key];
  }

  // pitchComp[name].assign(pitchComp[name], data);
  localStorage.setItem(pitchCompsKey, JSON.stringify(pitchComp));
}