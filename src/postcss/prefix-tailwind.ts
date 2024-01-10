import { AcceptedPlugin } from "postcss";
import { splitClassNames } from "./tailwind-edgecases";
import { PREFLIGHT_AFFECTED_TAGS } from "./preflight";
/**
 * Determine if class passes test
 *
 * @param {string} cssClass
 * @param {RegExp | RegExp[]} test
 */
const classMatchesTest = (
  cssClass: string,
  test: RegExp | RegExp[] | string | string[]
): boolean => {
  cssClass = cssClass.trim();

  if (test instanceof RegExp) {
    return !!test.exec(cssClass);
  }

  if (typeof test === "string") {
    return cssClass === test;
  }

  if (Array.isArray(test)) {
    // Reassign arguments
    return test.some((t) => {
      if (t instanceof RegExp) {
        return t.exec(cssClass);
      } else {
        return cssClass === t;
      }
    });
    /* c8 ignore next */
  }
  /* c8 ignore next 4 */
  // This will never happen so it is safe to ignore
  // Deleting it will change the return type of the function
  return cssClass === test;
};

export const prefixPlugin = ({
  prefix,
  ignore,
}: {
  prefix: string;
  ignore: RegExp | RegExp[] | string | string[];
}): AcceptedPlugin => {
  return {
    postcssPlugin: "prefix-tailwind-classes",

    Root(root) {
      root.walkRules((rule) => {
        if (!rule.selectors) {
          return false;
        }

        rule.selectors = rule.selectors.map((selector) => {
          // Is class selector
          if (selector.indexOf(".") !== 0) {
            // Fix for preflight reset
            if (PREFLIGHT_AFFECTED_TAGS.has(selector)) {
              return selector + "." + prefix;
            }
            return selector;
          }

          var classes = splitClassNames(selector);

          return classes
            .map((cssClass) => {
              if (
                classMatchesTest(cssClass, ignore) ||
                cssClass.trim().length === 0
              ) {
                return cssClass;
              }
              return prefix + cssClass;
            })
            .join(".");
        });
      });
    },
  };
};
