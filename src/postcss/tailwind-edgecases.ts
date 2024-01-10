export const splitClassNames = (classNames: string): string[] => {
  return classNames.split(/(?<!\\)\./);
};
