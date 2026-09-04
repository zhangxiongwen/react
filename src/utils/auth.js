/**
 * 简易登录状态（仅学习 demo 用，存在 localStorage）
 * 真实项目会用接口返回的 token，并可能配合 httpOnly cookie / Redux
 */

const TOKEN_KEY = 'demo_token'
const ROLE_KEY = 'demo_role'
const NAME_KEY = 'demo_name'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY) || 'guest'
}

export function getUserName() {
  return localStorage.getItem(NAME_KEY) || ''
}

export function isLoggedIn() {
  return Boolean(getToken())
}

/**
 * 模拟登录
 * @param {{ name: string, role?: 'user' | 'admin' }} payload
 */
export function login({ name, role = 'user' }) {
  localStorage.setItem(TOKEN_KEY, `token_${Date.now()}`)
  localStorage.setItem(ROLE_KEY, role)
  localStorage.setItem(NAME_KEY, name)
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(ROLE_KEY)
  localStorage.removeItem(NAME_KEY)
}
