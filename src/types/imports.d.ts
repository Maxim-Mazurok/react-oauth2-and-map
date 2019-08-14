declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*/variables.scss' {
  const value: {
    totalHeaderTabletWidth: string;
  };
  export default value;
}

window.google = {};
