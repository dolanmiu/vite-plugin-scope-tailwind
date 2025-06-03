import { AcceptedPlugin } from "postcss";
import { PREFLIGHT_AFFECTED_TAGS } from "./preflight";
import { persistTailwindClassNames } from "./state";
import { splitClassNames } from "./tailwind-edgecases";

import { syncWait } from "../util/sync-wait";

/**
 * Determine if class passes test
 *
 * @param {string} cssClass
 * @param {RegExp | RegExp[]} test
 */
const classMatchesTest = (
  cssClass: string,
  test: RegExp | RegExp[] | string | string[],
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
  // From 'foo.' to 'foo'
  // This '.' is added further up the chain
  // TODO: make all prefixes clean
  const cleanPrefix = prefix.replace(".", "");

  return {
    postcssPlugin: "prefix-tailwind-classes",

    Root(root) {
      root.walkRules((rule) => {
        if (!rule.selectors) {
          return false;
        }

        rule.selectors = rule.selectors.map((selector) => {
          // Is tag selector
          if (selector.indexOf(".") !== 0) {
            // Need this so that the library's preflight reset doesn't affect the outside app
            // This still allows the outside app to affect the library's tags, but that's ok, there is no way around that
            // This is because a h1 tag is the same in all cases.
            // Fix for preflight reset
            if (PREFLIGHT_AFFECTED_TAGS.has(selector)) {
              return selector + "." + cleanPrefix;
            }
            return selector;
          }

          // Is class selector
          var classes = splitClassNames(selector);

          // This is necessary because there is a race condition where the PostCSS plugin runs before the vite transform step!
          // Since they're two separate plugins, it is unclear how to figure out when Vite's transform finishes. So a simple wait is added for now until we have a better idea
          syncWait(2000);

          persistTailwindClassNames(classes);

          return classes
            .map((cssClass) => {
              if (
                classMatchesTest(cssClass, ignore) ||
                cssClass.trim().length === 0
              ) {
                return cssClass;
              }
              return `${cleanPrefix}-${cssClass}`;
            })
            .join(".");
        });
      });
    },
  };
};
