import CustomMatcherResult = jest.CustomMatcherResult;

export const toHaveAttribute = (
  received: HTMLElement,
  qualifiedName: string,
  value: string,
): CustomMatcherResult => {
  const pass =
    received.hasAttribute(qualifiedName) &&
    received.getAttribute(qualifiedName) === value;

  if (pass) {
    return {
      message: (): string =>
        `expected ${received.outerHTML} attribute "${qualifiedName}" not to be equal "${value}"`,
      pass: true,
    };
  } else {
    return {
      message: (): string =>
        `expected ${received.outerHTML} attribute "${qualifiedName}" to be equal "${value}"`,
      pass: false,
    };
  }
};
