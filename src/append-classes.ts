export const appendClassForReact = (id: string) => (code: string) => {
  const regex = /className/g;
  const found = code.match(regex);
  if (found) {
    const c = code
      .replace(/className: "/g, `className: "${id} `)
      .replace(/className: `/g, `className: \`${id} `);
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
    const c = code.replace(/class: "/g, `class: "${id} `);
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
