import type { App, Plugin } from "vue";

declare type Component = {
  name: string;
};
declare type SFCWithInstall<T> = T & Plugin & Component;

export const withInstall = <T extends Component>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    app.component(comp.name, comp);
  };
  return comp as SFCWithInstall<T>;
};
