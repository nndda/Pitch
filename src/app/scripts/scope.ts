interface PageScope {
  [key: string]: {
    container: string,
    varFallback: {
      [key: string]: string,
    },
  },
}

const scope : PageScope = {
  "project": {
    container: "",
    varFallback: {},
  },
  "profile": {
    container: "",
    varFallback: {},
  },
}