import compsCDNRaw from "../components-cdn.json";

const

	compsCDN: Record<string, string> = compsCDNRaw /* why */

,	CSSPre: string = `@charset "UTF-8";
#wrapper{
  --b: var(--itchio_bg_color);
  --b2: var(--itchio_bg2_color);
  --b2s: var(--itchio_bg2_sub);
  --t: var(--itchio_text_color);
  --l: var(--itchio_link_color);
  --br: var(--itchio_border_color);
  --btn: var(--itchio_button_color);
  --btn_f: var(--itchio_button_fg_color);
  --btn_s: var(--itchio_button_shadow_color)
}`

,	Stat404: ResponseInit = {
		status: 404,
	}

, StatGud: ResponseInit = {
		headers: {
			"Content-Type": "text/css; charset=utf-8",
		},
	}

;

export default {
	async fetch(request, _env, _ctx): Promise<Response> {
		const comps: string = new URL(request.url).pathname.slice(1);

		if (comps.trim()) {
			const output: string[] = [];

			for (let comp of decodeURIComponent(comps).split(",")) {
				comp = comp.trim();

				if (comp in compsCDN) {
					output.push(compsCDN[comp]);
				}
			}

			if (output.length === 0) return new Response(
		  	"Invalid component ID(s)", Stat404,
			);

			return new Response(
				CSSPre + output.join(""),
				StatGud,
			);
		}

    return new Response(
	  	"Component ID not provided", Stat404,
		);
	},

} satisfies ExportedHandler<Env>;
