import path from "path";
import { AcceptedPlugin } from "postcss";
import uniqid from "uniqid";
import { Plugin } from "vite";

import { appendClass, appendClassForReact } from "./append-classes";
import { appendTags, appendTagsForReact } from "./append-tags";
import { getPostCssConfig, postCssPluginsToArray } from "./get-postcss-config";
import { prefixPlugin } from "./postcss/prefix-tailwind";

const id = uniqid("d");

const appendForReact = (id: string) => (code: string) => {
  return {
    code: appendClassForReact(id)(appendTagsForReact(id)(code).code).code,
    map: null,
  };
};

const append = (id: string) => (code: string) => {
  return {
    code: appendClass(id)(appendTags(id)(code).code).code,
    map: null,
  };
};

const plugin = ({
  react = false,
  ignore = [],
}: { react?: boolean; ignore?: RegExp | RegExp[] } = {}): Plugin => ({
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
              require(path.join(process.cwd(), "node_modules", f)),
            ),
            prefixPlugin({ prefix: id, ignore }),
          ],
        },
      },
    };
  },
  transform: react ? appendForReact(id) : append(id),
});

export default plugin;
