import css from "./styles?css-component";

export default {
  css: css,

  name: "Speed Dial",

  page: async () => (await import("./page.svelte")).default,

  scopes: {
    compatible: [
      "project",
      "jam",
    ],
    partial: "profile",
  },
  scopeAMPincompatible: true,

  disallowCommentSection: true,

  tags: [
    "hacky",
    "singular",
  ],

  input: [
  //   {
  //     name: "Button count",
  //     default: 6,
  //     type: {
  //       min: 3,
  //       max: 6,
  //     },

  //     var: "SPEED_DIAL_BTN_COUNT",
  //     hardcoded: true,
  //   },
    {
      name: "Button color",
      var: "speed-dial-col",
      default: "",
      type: "color",
    },
  ],

  compatibleOnInputs: [
    "speed-dial-col",
  ],

} as ComponentData;
