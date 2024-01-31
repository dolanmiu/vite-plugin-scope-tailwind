import { appendClass, appendClassForReact } from "./append-classes";
import { PREFLIGHT_AFFECTED_TAGS } from "./postcss/preflight";

export const appendTagsForReact = (id: string) => (code: string) => {
  return append({
    id,
    regex: (tag) => new RegExp(`"${tag}", {(?:.|\\s)+?}\\)`, "g"),
    innerRegex: (tag) => new RegExp(`"${tag}", ({(?:.|\\s)+?})+?`, "i"),
    classText: "className",
    replace: {
      from: () => `, {`,
      to: () => `, {\nclassName: "${id}",`,
    },
    appendClassFn: appendClassForReact,
  })(code);
};

export const appendTags = (id: string) => (code: string) => {
  return append({
    id,
    regex: (tag) => new RegExp(`<${tag}(?:.|\\s)*?>[^<]*</${tag}>`, "g"),
    innerRegex: (tag) => new RegExp(`<${tag}(?:.|\\s)*?>`, "i"),
    classText: "class",
    replace: {
      from: (tag) => `<${tag}`,
      to: (tag) => `<${tag} class="${id}"`,
    },
    appendClassFn: appendClass,
  })(code);
};

const append =
  ({
    id,
    regex,
    innerRegex,
    classText,
    replace: { from, to },
    appendClassFn,
  }: {
    id: string;
    regex: (tag: string) => RegExp;
    innerRegex: (tag: string) => RegExp;
    classText: "class" | "className";
    replace: { from: (tag: string) => string; to: (tag: string) => string };
    appendClassFn: (id: string) => (code: string) => {
      code: string;
      map: null;
    };
  }) =>
  (code: string) => {
    let currCode = code;
    for (const tag of PREFLIGHT_AFFECTED_TAGS) {
      const matches = [...currCode.matchAll(regex(tag))].map((m) => m[0]);

      for (const match of matches) {
        const [obj] = [...(currCode.match(innerRegex(tag)) ?? [])];
        if (obj.includes(classText)) {
          const output = appendClassFn(id)(match);
          currCode = currCode.replace(match, output.code);
        } else {
          // That means that className is not present
          // We need to add it
          currCode = currCode.replace(match, match.replace(from(tag), to(tag)));
        }
      }
    }

    return {
      code: currCode,
      map: null,
    };
  };
