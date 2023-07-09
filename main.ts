import unoRuntime from "https://esm.sh/@unocss/runtime@0.53.4";
import { UserConfig } from "https://esm.sh/@unocss/core@0.53.4";

export default function hydrate(config: UserConfig) {
  window.__unocss = config;
  unoRuntime();
}
