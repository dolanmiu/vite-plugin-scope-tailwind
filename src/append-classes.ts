import { getTailwindClassNames } from "./postcss/state";
import {
  appendIdWithQuotesInMind,
  getNonQuotedCleanedOutput,
} from "./util/class-string-utils";

const appendClassWithId = (input: string, id: string): string => {
  if (getTailwindClassNames().has(getNonQuotedCleanedOutput(input))) {
    return appendIdWithQuotesInMind(input, id);
  } else {
    return input;
  }
};

export const transformClasses = ({
  c,
  classIdentifier,
  id,
}: {
  c: string;
  id: string;
  classIdentifier: string;
}): string => {
  const re = new RegExp(`${classIdentifier}: "(.+?)"`, "gi");
  const matches = c.matchAll(re);

  for (const [fullText, classes] of matches) {
    c = c.replace(
      fullText,
      `${classIdentifier}: "${classes
        .split(" ")
        .map((c) => appendClassWithId(c, id))
        .join(" ")}"`,
    );
  }
  return c;
};

export const tildeTransformClasses = ({
  c,
  classIdentifier,
  id,
}: {
  c: string;
  id: string;
  classIdentifier: string;
}): string => {
  const re = new RegExp(`${classIdentifier}: \`(.+?)\``, "gi");
  const matches = c.matchAll(re);

  for (const [fullText, classes] of matches) {
    c = c.replace(
      fullText,
      `${classIdentifier}: \`${classes
        .split(" ")
        .map((c) => appendClassWithId(c, id))
        .join(" ")}\``,
    );
  }
  return c;
};

export const appendClassForReact = (id: string) => (code: string) => {
  const regex = /className/g;
  const found = code.match(regex);
  if (found) {
    let c = code
      .replace(/className: "/g, `className: "${id} `)
      .replace(/className: `/g, `className: \`${id} `);

    c = transformClasses({
      c,
      id,
      classIdentifier: "className",
    });

    c = tildeTransformClasses({
      c,
      id,
      classIdentifier: "className",
    });

    return {
      code: c,
      map: null,
    };
  } else {
    return {
      code,
      map: null,
    };
  }
};

export const appendClass = (id: string) => (code: string) => {
  const regex = /class/g;
  const found = code.match(regex);
  if (found) {
    let c = code
      .replace(/class: "/g, `class: "${id} `)
      .replace(/class="/g, `class="${id} `);

    c = transformClasses({
      c,
      id,
      classIdentifier: "class",
    });

    c = tildeTransformClasses({
      c,
      id,
      classIdentifier: "class",
    });
    return {
      code: c,
      map: null,
    };
  } else {
    return {
      code,
      map: null,
    };
  }
};
