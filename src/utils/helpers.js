/**
 * 通用工具函数
 * 初学阶段先放最常用的几个，后续可按需扩展
 */

/**
 * 根据分类 id 和条目 id，生成详情页路径
 * @param {string} categoryId - 大类 id
 * @param {string} itemId - 子条目 id
 * @returns {string} 例如 "/lesson/jsx/what-is-jsx"
 */
export function getLessonPath(categoryId, itemId) {
  return `/lesson/${categoryId}/${itemId}`
}

/**
 * 从 lessons 数据里查找某个知识点
 * @param {Array} categories - 全部分类数据
 * @param {string} categoryId
 * @param {string} itemId
 * @returns {{ category: object|null, item: object|null }}
 */
export function findLesson(categories, categoryId, itemId) {
  const category = categories.find((c) => c.id === categoryId) || null
  const item = category?.items?.find((i) => i.id === itemId) || null
  return { category, item }
}

/**
 * 安全取值：对象为空时返回默认值，避免页面报错
 * @param {*} value
 * @param {*} fallback
 */
export function safeValue(value, fallback = '') {
  return value == null ? fallback : value
}
