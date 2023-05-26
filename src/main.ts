import { Plugin } from "vite";
import path from "path";
import { AcceptedPlugin } from "postcss";
import uniqid from "uniqid";

import { getPostCssConfig, postCssPluginsToArray } from "./get-postcss-config";
import { prefixPlugin } from "./postcss/prefix-tailwind";
import { appendClass, appendClassForReact } from "./append-classes";

const id = uniqid("d");

const plugin = ({ react = false }: { react?: boolean } = {}): Plugin => ({
  name: "vite-plugin-scope-tailwind",
  config: (config) => {
    const currentPostCssPlugins =
      (config.css?.postcss as any)?.plugins ?? ([] as AcceptedPlugin[]);
    const postCssConfigFile = getPostCssConfig();

    return {
      css: {
        postcss: {
          plugins: [
            ...currentPostCssPlugins,
            ...postCssPluginsToArray(postCssConfigFile).map((f) =>
              require(path.join(process.cwd(), "node_modules", f))
            ),
            prefixPlugin({ prefix: `${id}.`, ignore: [] }),
          ],
        },
      },
    };
  },
  transform: react ? appendClassForReact(id) : appendClass(id),
});

export default plugin;
