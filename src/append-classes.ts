export const appendClassForReact = (id: string) => (code: string) => {
  console.log(code);
  const regex = /className/g;
  const found = code.match(regex);
  if (found) {
    const c = code
      .replace(/className: "/g, `className: "${id} `)
      .replace(/className: `/g, `className: \`${id} `);
    return c;
  } else {
    return code;
  }
};

export const appendClass = (id: string) => (code: string) => {
  const regex = /class/g;
  const found = code.match(regex);
  if (found) {
    const c = code.replace(/class: "/g, `class: "${id} `);
    return c;
  } else {
    return code;
  }
};
