// Inspired by: https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution
export const syncWait = (ms: number) => {
  const end = Date.now() + ms;
  while (Date.now() < end) continue;
};
