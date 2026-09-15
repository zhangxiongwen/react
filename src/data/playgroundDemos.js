/**
 * 代码演练台 Demo 总入口
 * 按「从简单到复杂」的分组顺序合并
 * part1~part4 是 HTML/CSS/JS 片段，part5 起是 React 源码（带 runtime: 'react'）
 */
import part1 from './playgroundDemos/part1-basic-flex'
import part2 from './playgroundDemos/part2-grid-position'
import part3 from './playgroundDemos/part3-apps-js'
import part4 from './playgroundDemos/part4-pseudo'
import part5 from './playgroundDemos/part5-react-state'
import part6 from './playgroundDemos/part6-react-props'
import part7 from './playgroundDemos/part7-react-hooks'
import part8 from './playgroundDemos/part8-react-data'
import part9 from './playgroundDemos/part9-react-cases'
import part10 from './playgroundDemos/part10-storage-url'

const playgroundDemos = [
  ...part1,
  ...part2,
  ...part3,
  ...part4,
  ...part5,
  ...part6,
  ...part7,
  ...part8,
  ...part9,
  ...part10,
]

export default playgroundDemos
