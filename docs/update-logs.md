---
outline: deep
---

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()

const attention = '⚠️ 重点注意'
const feature = '🆕 新增功能'
const fix = '🐛 问题修复'
const perf = '💎 功能优化'
const style = '💅 样式更新'
const typescript = '🆎 类型修正'
const refactor = '代码重构'
const tags = [attention,feature,fix,perf,style,typescript,refactor]
</script>

# 更新日志

<pre>{{ tags.join('/') }}</pre>

## 0.0.1

#### {{ feature }}

<pre>使用VitePress构建文档</pre>

## 0.0.0

<pre>Init</pre>
