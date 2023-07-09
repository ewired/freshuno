import { Plugin } from "$fresh/server.ts";
import {
  createGenerator,
  UserConfig,
} from "https://esm.sh/@unocss/core@0.53.4?target=deno";

const STYLE_ELEMENT_ID = "__FRSH_UNOCSS";

export default function freshuno(
  config: UserConfig,
  configURL: string,
): Plugin {
  const generator = createGenerator(config);
  const main = `data:application/javascript,import hydrate from "${
    new URL("./main.ts", import.meta.url).href
  }";
import config from "${configURL}";
export default function() { hydrate(config); }`;
  return {
    name: "freshuno",
    entrypoints: { "main": main },
    async renderAsync(ctx) {
      const res = await ctx.renderAsync();
      const { css: cssText } = await generator.generate(res.htmlText);
      return {
        scripts: res.requiresHydration
          ? [{ entrypoint: "main", state: [] }]
          : [],
        styles: [{ cssText, id: STYLE_ELEMENT_ID }],
      };
    },
  };
}
