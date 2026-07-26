export function getRules(
  rules: CSSRuleList,
  output: CSSRule[] = [],
): CSSRule[] {
  for (let n = rules.length; n-- > 0;) {
    const rule = rules[n];

    output.push(rule);

    if (rule instanceof CSSGroupingRule) {
      getRules(rule.cssRules, output);
    }
  }

  return output;
}

export function extractFontFace(
  cssSrc: string,
): string {
  const out: string[] = [];

  if (cssSrc.includes("@font-face")) {
    const
      stylesheet = new CSSStyleSheet()
    ;

    stylesheet.replaceSync(cssSrc);

    for (const rule of getRules(stylesheet.cssRules)) {
      if (rule instanceof CSSFontFaceRule) {
        out.push(rule.cssText);
      }
    }
  } else {
    return "";
  }

  return out.join("");
}
