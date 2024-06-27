export const getNonQuotedCleanedOutput = (input: string) => {
  return input.replace(/"/g, "").replace(/'/g, "");
};

export const appendIdWithQuotesInMind = (input: string, id: string) => {
  if (input.startsWith("'") && input.endsWith("'")) {
    return `'${id}-${getNonQuotedCleanedOutput(input)}'`;
  }

  if (input.startsWith('"') && input.endsWith('"')) {
    return `"${id}-${getNonQuotedCleanedOutput(input)}"`;
  }

  if (input.endsWith('"')) {
    return `${id}-${getNonQuotedCleanedOutput(input)}"`;
  }

  if (input.endsWith("'")) {
    return `${id}-${getNonQuotedCleanedOutput(input)}'`;
  }

  if (input.startsWith('"')) {
    return `"${id}-${getNonQuotedCleanedOutput(input)}`;
  }

  if (input.startsWith("'")) {
    return `'${id}-${getNonQuotedCleanedOutput(input)}`;
  }

  return `${id}-${input}`;
};
