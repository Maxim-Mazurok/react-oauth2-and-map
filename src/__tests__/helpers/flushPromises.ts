export const flushPromises = (): Promise<NodeJS.Immediate> =>
  new Promise(setImmediate);
