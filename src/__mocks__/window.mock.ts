export const mockWindow = {
  matchMedia: jest.fn().mockImplementation(
    (query: string): MediaQueryList => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    },
  ),
};
window.matchMedia = mockWindow.matchMedia;
