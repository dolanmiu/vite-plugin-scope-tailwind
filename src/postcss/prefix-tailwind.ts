import { AcceptedPlugin } from "postcss";
/**
 * Determine if class passes test
 *
 * @param {string} cssClass
 * @param {RegExp | RegExp[]} test
 */
function classMatchesTest(cssClass: string, test: RegExp | RegExp[]) {
  if (!test) {
    return false;
  }

  cssClass = cssClass.trim();

  if (test instanceof RegExp) {
    return test.exec(cssClass);
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
  }

  return cssClass === test;
}

export const prefixPlugin = ({
  prefix,
  ignore,
}: {
  prefix: string;
  ignore: RegExp | RegExp[];
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
            return selector;
          }

          var classes = selector.split(".");

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
