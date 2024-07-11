export const globalState: { tailwindClassNames: Set<string> } = {
  tailwindClassNames: new Set<string>(),
};

export const persistTailwindClassNames = (classes: string[]): void => {
  for (const item of classes) {
    if (item === "") {
      continue;
    }

    const unEscaped = item.replace(/\\/gi, "");
    if (unEscaped.startsWith("[")) {
      const matches = [...unEscaped.matchAll(/(\[.+?\]:.+?):/g)];
      const [[_, match = unEscaped]] = [
        ...(matches.length > 0 ? matches : [[]]),
      ];
      globalState.tailwindClassNames.add(match);
      globalState.tailwindClassNames.add(item);
    } else {
      // Case where it is a pseudo class like focus:
      const [matches] = [...unEscaped.matchAll(/^([a-z]+):/g)];

      if (matches && matches[1]) {
        const re = new RegExp(`(${matches[1]}:.+):${matches[1]}`, "gi");
        const [newMatches] = [...unEscaped.matchAll(re)];
        if (newMatches && newMatches[1]) {
          globalState.tailwindClassNames.add(newMatches[1]);
        }
      }
      globalState.tailwindClassNames.add(unEscaped);
    }
  }
};

export const getTailwindClassNames = (): Set<string> =>
  globalState.tailwindClassNames;
