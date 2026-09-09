/**
 * 全局常量
 * 集中管理项目里不会轻易变化的配置，避免魔法字符串散落各处
 */
export const APP_NAME = '知趣集'
/** 首页主标题（导航品牌仍用 APP_NAME） */
export const HOME_TITLE = 'React 入门到能写项目'
export const APP_DESC =
  '从 HTML/CSS、JavaScript 地基讲到 React、TypeScript、Ant Design，最后用一个完整后台项目串起路由、请求、权限和国际化'

/** 路由路径前缀 */
export const ROUTES = {
  HOME: '/',
  LESSON: '/lesson/:categoryId/:itemId',
}
