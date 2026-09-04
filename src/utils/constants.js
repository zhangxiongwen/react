/**
 * 全局常量
 * 集中管理项目里不会轻易变化的配置，避免魔法字符串散落各处
 */
export const APP_NAME = '知趣集'
/** 首页主标题（导航品牌仍用 APP_NAME） */
export const HOME_TITLE = 'React 入门学习'
export const APP_DESC = '由浅入深、带完整示例与易错点的 React 初学者手册，学完能写基础项目'

/** 路由路径前缀 */
export const ROUTES = {
  HOME: '/',
  LESSON: '/lesson/:categoryId/:itemId',
}
