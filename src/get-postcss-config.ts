import path from "path";

export const getPostCssConfig = (): any | undefined => {
  try {
    const file = require(path.join(process.cwd(), "postcss.config.js"));

    return file;
  } catch {}

  try {
    const file = require(path.join(process.cwd(), "postcss.config.cjs"));

    return file;
  } catch {}

  try {
    const file = require(path.join(process.cwd(), "postcss.config.json"));

    return file;
  } catch {}

  return {
    plugins: {},
  };
};

export const postCssPluginsToArray = (config: { plugins: any }): string[] => {
  return Object.keys(config.plugins);
};
