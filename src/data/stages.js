/**
 * 学习阶段
 * 19 章平铺太长，按阶段分成四段，首页据此分组展示
 * from / to 是章节 order 的闭区间，新增章节时记得把区间跟着调
 */
const stages = [
  {
    id: 'foundation',
    label: '阶段一 · 前端地基',
    desc: '不碰 React，先把网页是怎么写出来的搞清楚：标签、CSS 布局、JS 语法',
    from: 1,
    to: 3,
  },
  {
    id: 'react-core',
    label: '阶段二 · React 核心语法',
    desc: 'React 本体：JSX、组件、State、事件、条件列表、Hooks、通信、路由',
    from: 4,
    to: 12,
  },
  {
    id: 'engineering',
    label: '阶段三 · 工程化与数据',
    desc: '让代码能给别人看、能连后端：样式方案、命名规范、接口请求、全局状态',
    from: 13,
    to: 16,
  },
  {
    id: 'advanced',
    label: '阶段四 · 进阶与实战',
    desc: '真实项目里绕不开的三件事：TypeScript、组件库、完整项目从架构到上线',
    from: 17,
    to: 19,
  },
]

/** 把章节数组按阶段分组，返回 [{ stage, categories }] */
export function groupByStage(categories) {
  return stages
    .map((stage) => ({
      stage,
      categories: categories.filter(
        (c) => c.order >= stage.from && c.order <= stage.to
      ),
    }))
    .filter((group) => group.categories.length > 0)
}

export default stages
