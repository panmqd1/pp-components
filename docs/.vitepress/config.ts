import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PP-Components",
  description: "components by pmq",
  // 项目目录
  base: "/pp-components/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/components/border-wrapper" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [{ text: "Update Logs", link: "/update-logs" }],
      },
      {
        text: "Components",
        items: [
          {
            text: "边框容器 BorderWrapper",
            link: "/components/border-wrapper",
          },
          { text: "图表空态 ChartEmpty", link: "/components/chart-empty" },
          { text: "折叠板 CollapsePanel", link: "/components/collapse-panel" },
          { text: "简易表格 CustomTable", link: "/components/custom-table" },
          {
            text: "日期月份切换 DateMonthPicker",
            link: "/components/date-month-picker",
          },
          { text: "缩略标签 EllipticTags", link: "/components/elliptic-tags" },
          { text: "自定义加载 Loading", link: "/components/loading" },
          { text: "图标 ReIcon", link: "/components/reicon" },
          { text: "缩放盒子 ScreenBox", link: "/components/screen-box" },
          { text: "表格空态 TableEmpty", link: "/components/table-empty" },
          {
            text: "星期月份切换 WeekMonthPicker",
            link: "/components/week-month-picker",
          },
        ],
      },
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //   ]
      // }
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
