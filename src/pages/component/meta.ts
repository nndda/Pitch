export const

  // TODO: could use further DRY-ing by inferring the metadata keys instead, maybe??

  cat = [
    "Components",
    "Decorations",
    "Tweaks",
  ] as const

, scopes = [
    "project",
    "profile",
    "jam",
    "devlog",
  ] as const

, scopeStatus = [
    "compatible",
    "partial",
    "none",
    "only",
  ] as const

, tags = [
    "experimental",
    "hacky",
    "singular",
  ] as const

, catMetadata = {
    // TODO: descriptions
    Components: {
      icon: "fa-solid fa-bars-progress",
      desc: "Standalone HTML component and custom classes.",
    },
    Decorations: {
      icon: "fa-solid fa-paint-roller",
      desc: "Decorative components.",
    },
    Tweaks: {
      icon: "fa-solid fa-pen-ruler",
      desc: "...",
    },
  } as const

, scopesIcons: Record<ScopeStatus, string> = {
    compatible: "fa-solid fa-circle-check",
    partial: "fa-solid fa-triangle-exclamation",
    none: "fa-solid fa-square-xmark",
    only: "fa-solid fa-lock",
  } as const

, tagsData: Record<ComponentTags, {
    icon: string,
    desc: string,
    color: string,
}> = {
    experimental: {
      icon: "fa-solid fa-vial",
      desc: "Use with caution, and test thoroughly.",
      color: "#3ad2fc",
    },
    hacky: {
      icon: "fa-solid fa-flask",
      desc: "Contains unconventional CSS/HTML codes and/or implementation.",
      color: "#18f08b",
    },
    singular: {
      icon: "fa-solid fa-hand-point-up",
      desc: "Only one instance of the component per page.",
      color: "#eaeaea"
    },
  } as const

;
