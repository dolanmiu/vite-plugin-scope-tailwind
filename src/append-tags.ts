import { appendClass, appendClassForReact } from "./append-classes";
import { PREFLIGHT_AFFECTED_TAGS } from "./postcss/preflight";

export const appendTagsForReact = (id: string) => (code: string) => {
  let currCode = code;
  for (const tag of PREFLIGHT_AFFECTED_TAGS) {
    const regex = new RegExp(`"${tag}", {(?:.|\\s)+?}\\)`, "g");
    const matches = [...currCode.matchAll(regex)].map((m) => m[0]);

    for (const match of matches) {
      const regex = new RegExp(`"${tag}", ({(?:.|\\s)+?})+?`, "i");

      const [obj] = [...(currCode.match(regex) ?? [])];
      if (obj.includes("className")) {
        const output = appendClassForReact(id)(match);
        currCode = currCode.replace(match, output.code);
      } else {
        // That means that className is not present
        // We need to add it
        currCode = currCode.replace(
          match,
          match.replace(`, {`, `, {\nclassName: "${id}",`),
        );
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
    const regex = new RegExp(`<${tag}(?:.|\\s)*?>[^<]*</${tag}>`, "g");
    const matches = [...currCode.matchAll(regex)].map((m) => m[0]);

    for (const match of matches) {
      const [obj] = [
        ...(currCode.match(new RegExp(`<${tag}(?:.|\\s)*?>`, "i")) ?? []),
      ];
      if (obj.includes("class")) {
        const output = appendClass(id)(match);
        currCode = currCode.replace(match, output.code);
      } else {
        // That means that className is not present
        // We need to add it
        currCode = currCode.replace(
          match,
          match.replace(`<${tag}`, `<${tag} class="${id}"`),
        );
      }
    }
  }

  return {
    code: currCode,
    map: null,
  };
};
