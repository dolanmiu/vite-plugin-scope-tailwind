import { appendClass, appendClassForReact } from "./append-classes";
import { PREFLIGHT_AFFECTED_TAGS } from "./postcss/preflight";

export const appendTagsForReact = (id: string) => (code: string) => {
  let currCode = code;
  for (const tag of PREFLIGHT_AFFECTED_TAGS) {
    const regex = new RegExp(`"${tag}", {(?:.|\\s)+?}\\)`, "g");
    const matches = [...currCode.matchAll(regex)].map((m) => m[0]);

    for (const match of matches) {
      const output = appendClassForReact(id)(match);

      if (output.code === match) {
        // That means that className is not present
        // We need to add it
        currCode = currCode.replace(
          match,
          match.replace(`, {`, `, {\nclassName: "${id}",`),
        );
      } else {
        currCode = currCode.replace(match, output.code);
      }
    }
  }

  return {
    code: currCode,
    map: null,
  };
};

export const appendTags = (id: string) => (code: string) => {
  let currCode = code;
  for (const tag of PREFLIGHT_AFFECTED_TAGS) {
    const regex = new RegExp(`<${tag}.*>[^<]*</${tag}>`, "g");
    const matches = [...currCode.matchAll(regex)].map((m) => m[0]);

    for (const match of matches) {
      const output = appendClass(id)(match);

      if (output.code === match) {
        // That means that className is not present
        // We need to add it
        currCode = currCode.replace(
          match,
          match.replace(`<${tag}`, `<${tag} class="${id}"`),
        );
      } else {
        currCode = currCode.replace(match, output.code);
      }
    }
  }

  return {
    code: currCode,
    map: null,
  };
};
