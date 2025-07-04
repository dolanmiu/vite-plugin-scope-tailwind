import path from "path";

type PostCssConfig = {
  plugins: {
    [key: string]: any;
  };
};

export const getPostCssConfig = (): PostCssConfig => {
  try {
    const file = require(path.join(process.cwd(), "postcss.config.js"));

    return fileToConfig(file);
  } catch {}

  try {
    const file = require(path.join(process.cwd(), "postcss.config.cjs"));

    return fileToConfig(file);
  } catch {}

  try {
    const file = require(path.join(process.cwd(), "postcss.config.json"));

    return fileToConfig(file);
  } catch {}

  return {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
};

export const postCssPluginsToArray = (config: PostCssConfig): string[] => {
  return Object.keys(config.plugins);
};

/* v8 ignore start */
// Difficult to test because `require()` can't be mocked for this code path to run
const fileToConfig = (file: any): PostCssConfig => {
  if (file.default) {
    return file.default();
  }

  return file;
};
/* v8 ignore stop */
