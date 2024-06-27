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
      const [[_, match = unEscaped]] = [
        ...unEscaped.matchAll(/(\[.+?\]:.+?):/g),
      ];
      globalState.tailwindClassNames.add(match);
      globalState.tailwindClassNames.add(item);
    } else {
      globalState.tailwindClassNames.add(unEscaped);
    }
  }
};

export const getTailwindClassNames = (): Set<string> =>
  globalState.tailwindClassNames;
