/**
 * 代码演练台 Demo 总入口
 * 按「从简单到复杂」的分组顺序合并
 */
import part1 from './playgroundDemos/part1-basic-flex'
import part2 from './playgroundDemos/part2-grid-position'
import part3 from './playgroundDemos/part3-apps-js'
import part4 from './playgroundDemos/part4-pseudo'

const playgroundDemos = [...part1, ...part2, ...part3, ...part4]

export default playgroundDemos
