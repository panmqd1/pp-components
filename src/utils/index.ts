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

export const loadScript = (url: string) => {
  return new Promise((resolve, reject) => {
    // 加载sparkMD5
    const tag = document.createElement("script");
    tag.src = url;
    document.body.append(tag);
    tag.onload = () => {
      resolve(true);
    };
    tag.onerror = () => {
      reject();
    };
  });
};
