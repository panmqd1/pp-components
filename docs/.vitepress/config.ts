import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PP-Components",
  description: "components by pmq",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/components-examples' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Update Logs', link: '/update-logs' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: '边框容器 BorderWrapper', link: '/border-wrapper' },
        ]
      }
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //   ]
      // }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
