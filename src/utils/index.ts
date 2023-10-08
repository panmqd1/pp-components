import type { App } from "vue";

export const withInstall = (comp) => {
  comp.instal = (app: App) => {
    app.component(comp.name, comp);
  };
  return comp;
};
