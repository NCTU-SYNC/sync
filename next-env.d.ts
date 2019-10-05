/// <reference types="next" />
/// <reference types="next/types/global" />

// https://stackoverflow.com/a/45887328
// And thanks Kelvin.
declare module '*.svg' {
  const content: any;
  export default content;
}
