export const COMPILED_JSX = `
import { Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";

const TestComponent = ({ isOpen, onClose, onDone }) => {
  const [state, setState] = useState(
    void 0
  );
  const [description, setDescription] = useState("");
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", id: "modal-root", children: [] });
};
export { TestComponent };
`;

export const COMPILED_BACK_TICK_JSX = `
import { Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";

const TestComponent = ({ isOpen, onClose, onDone }) => {
  const [state, setState] = useState(
    void 0
  );
  const [description, setDescription] = useState("");
  return /* @__PURE__ */ jsx("div", { className: \`flex flex-col gap-4 \${true ? "top-0" : "bottom-0"}\`, id: "modal-root", children: [] });
};
export { TestComponent };
`;
