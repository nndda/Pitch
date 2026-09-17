export const

  cat = [
    "Components",
    "Decorations",
    "Tweaks",
  ]

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

, catMetadata: Record<ComponentCategory, { icon: string, }> = {
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

, scopesIcons: Record<ScopeStatus, string> = {
    compatible: "fa-solid fa-circle-check",
    partial: "fa-solid fa-triangle-exclamation",
    none: "fa-solid fa-square-xmark",
    only: "fa-solid fa-lock",
  }

, tagsData: Record<ComponentTags, {icon: string, desc: string}> = {
    experimental: {
      icon: "fa-solid fa-vial",
      desc: "Use with caution, and test thoroughly.",
    },
    hacky: {
      icon: "fa-solid fa-flask",
      desc: "Contains unconventional CSS/HTML codes and/or implementation.",
    },
    singular: {
      icon: "fa-solid fa-hand-point-up",
      desc: "Only one instance of the component per page.",
    },
  }

;
