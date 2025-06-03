// Use https://babeljs.io/repl to make

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

export const COMPILED_NESTED_TAG_JSX = `
import { Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";

const TestComponent = ({ isOpen, onClose, onDone }) => {
  const [state, setState] = useState(
    void 0
  );
  const [description, setDescription] = useState("");
  return /* @__PURE__ */ jsx("ol", { id: "modal-root", children: [{
    className: "flex"
  }] });
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

export const COMPILED_BACK_TICK_JSX_WITH_PREFLIGHT_TAGS = `
import { Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
export const TestComponent = () => {
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("h1", {
      children: "Hello"
    }), /*#__PURE__*/_jsx("h2", {
      className: \`test \${variable}\`,
      children: "World"
    }), /*#__PURE__*/_jsx("h1", {
      children: "Foo"
    }), /*#__PURE__*/_jsx("h1", {
      children: "Bar"
    })]
  });
};
`;

export const COMPILED_FORM = `
import { jsx } from "react/jsx-runtime";
import { FormProvider, useForm } from "react-hook-form";
export const Form = ({
  onSubmit,
  props: formElementProps,
  formRef,
  ref = formRef,
  children,
  ...restProps
}) => {
  const methods = useForm({
    mode: "onChange",
    // This is needed for progressive disclosures to work. It un-registers fields on unmount.
    shouldUnregister: true,
    ...restProps
  });
  return /* @__PURE__ */ jsx(FormProvider, { ...methods, children: /* @__PURE__ */ jsx(
    "form",
    {
      className: "flex flex-col",
      onSubmit: methods.handleSubmit(onSubmit),
      ref,
      ...formElementProps,
      children
    }
  ) });
};
`;
