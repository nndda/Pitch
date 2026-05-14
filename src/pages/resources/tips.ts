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

export const tips: Tips = {
  "HTML on itch.io": {
    icon: "fa-brands fa-html5",
    items: [
      `Blank newlines will be stripped.`,

      `Input-related elements, e.g. ${html("input")}, ${html("label")}, etc. are not allowed, and will be sanitized.`,

      `Attributes ${code("id")} and ${code("name")} are not allowed.`,

      `Custom ${code("data-*")} attributes are not allowed.`,

      `${html("a")} pointing to external links will always have the attributes: ${code(`rel="nofollow noopener"`)} and ${code(`referrerpolicy="origin"`)} added automatically`,

      `Anchor links on ${html("a")} will not work, unless you include the whole URL of the page.`,

      `Comment tags are not supported, and will be rendered as is.`,

      `${html("b")} and ${html("i")} tags will be converted to ${html("strong")} and ${html("em")} respectively.`,

      `${code("name")} attribute are not supported for ${html("details")} tag, and will be stripped.`,
    ],
  },
  "CSS on itch.io": {
    icon: "fa-brands fa-css",
    items: [
      `Profile pages CSS are limited to <b>5120 characters</b>.`,

      `It is possible to write comments in HTML, and style it by adding the ${code(".custom-*")} CSS classes, if said classes are not scoped to the actual page's content.`,
    ],
  },
};
