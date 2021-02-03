declare interface IRibbonTestCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'RibbonTestCommandSetStrings' {
  const strings: IRibbonTestCommandSetStrings;
  export = strings;
}
