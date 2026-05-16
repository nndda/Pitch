interface Tips {
  [cat: string]: {
    icon: string,
    items: string[],
  },
}

function code(str: string): string {
  return `<code>${str}</code>`
}

function html(tag: string): string {
  return `<code>&lt;${tag}&gt;</code>`
}

function link(text: string, url: string): string {
  return `<a target="_blank" rel="me nofollow noopener" href="${url}">${text}</a>`
}

const
  links = {
    AMP: link("AMP", "https://en.wikipedia.org/wiki/Accelerated_Mobile_Pages"),
  }
, htmlTagsStr = [
    "input",
    "label",
    "a",
    "details",
    "b",
    "i",
    "strong",
    "em",
  ]
, tags = {
    ... htmlTagsStr.reduce(
      (prev, val) => {
        prev[val] = link(
          html(val),
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/" + val,
        );
        return prev;
      },
      {} as Record<string, string>,
    )
  }
;

export const tips: Tips = {
  "HTML on itch.io": {
    icon: "fa-brands fa-html5",
    items: [
      `Blank newlines will be stripped.`,

      `Input-related elements, e.g. ${tags.label}, ${tags.label}, etc. are not allowed, and will be sanitized.`,

      `Attributes ${code("id")} and ${code("name")} are not allowed.`,

      `Custom ${code("data-*")} attributes are not allowed.`,

      `${tags.a} pointing to external links will always have the attributes: ${code(`rel="nofollow noopener"`)} and ${code(`referrerpolicy="origin"`)} added automatically`,

      `Anchor links on ${tags.a} will not work, unless you include the whole URL of the page.`,

      `Comment tags are not supported, and will be rendered as is.`,

      `${tags.b} and ${tags.i} tags will be converted to ${tags.strong} and ${tags.em} respectively.`,

      `${code("name")} attribute are not supported for ${tags.details} tag, and will be stripped.`,
    ],
  },
  "CSS on itch.io": {
    icon: "fa-brands fa-css",
    items: [
      `Profile pages CSS are limited to <b>5120 characters</b>.`,

      `It is possible to write comments in HTML, and style it by adding the ${code(".custom-*")} CSS classes, if said classes are not scoped to the actual page's content.`,

      `On mobile, when visiting a devlog from Google search result, you might get served the ${links.AMP} version of the page instead. Which strips it of all the custom CSS.`
    ],
  },
};
