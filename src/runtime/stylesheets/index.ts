// Simulated itch.io's CSS + ALL of Pitch's components' CSS
import itchCSS from "@styles/_itchio.scss?inline";
export const itchStyling = new CSSStyleSheet();
itchStyling.replaceSync(itchCSS);

export const
  // User's CSS input stylesheet
  inputStyling = new CSSStyleSheet()
, fontLocalStyling: Record<string, CSSStyleSheet> = {}
;
