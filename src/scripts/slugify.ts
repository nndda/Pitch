import slugify from "slugify";
const slugifyOpt = {
  strict: true,
  lower: true,
};

slugify.extend({
  "👉": "uw",
  "👈": "wu",
});

export function slug(str: string): string {
  return slugify(str, slugifyOpt);
}

export function createCompIdFunc(catId: string): (compName: string) => string {
  return function (compName: string): string {
    return slugify(catId + "__" + compName, slugifyOpt);
  };
}
