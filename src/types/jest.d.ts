declare namespace jest {
  interface Matchers<R> {
    toHaveAttribute(qualifiedName: string, value: string): CustomMatcherResult;
  }
}
