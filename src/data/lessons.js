/**
 * 知识点总入口
 * 把各章节合并成一个数组，供首页和详情页使用
 */
import htmlLayout from './lessons/00-html-layout'
import intro from './lessons/01-intro'
import conventions from './lessons/02-conventions'
import jsx from './lessons/02-jsx'
import components from './lessons/03-components'
import state from './lessons/04-state'
import events from './lessons/05-events'
import render from './lessons/06-render'
import hooks from './lessons/07-hooks'
import communicate from './lessons/08-communicate'
import router from './lessons/09-router'
import styling from './lessons/10-styling'
import redux from './lessons/12-redux'
import practice from './lessons/11-practice'

const lessons = [
  htmlLayout,
  intro,
  conventions,
  jsx,
  components,
  state,
  events,
  render,
  hooks,
  communicate,
  router,
  styling,
  redux,
  practice,
]

export default lessons
