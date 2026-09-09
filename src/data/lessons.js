/**
 * 知识点总入口
 * 把各章节合并成一个数组，供首页和详情页使用
 * 文件名前缀 = 章节顺序（order），调整顺序时两边要一起改
 */
import htmlTags from './lessons/01-html-tags'
import cssLayout from './lessons/02-css-layout'
import jsBasics from './lessons/03-js-basics'
import intro from './lessons/04-intro'
import jsx from './lessons/05-jsx'
import components from './lessons/06-components'
import state from './lessons/07-state'
import events from './lessons/08-events'
import render from './lessons/09-render'
import hooks from './lessons/10-hooks'
import communicate from './lessons/11-communicate'
import router from './lessons/12-router'
import styling from './lessons/13-styling'
import conventions from './lessons/14-conventions'
import practice from './lessons/15-practice'
import redux from './lessons/16-redux'
import typescript from './lessons/17-typescript'
import antdGuide from './lessons/18-antd'
import projectGuide from './lessons/19-project'

const lessons = [
  htmlTags,
  cssLayout,
  jsBasics,
  intro,
  jsx,
  components,
  state,
  events,
  render,
  hooks,
  communicate,
  router,
  styling,
  conventions,
  practice,
  redux,
  typescript,
  antdGuide,
  projectGuide,
]

export default lessons
