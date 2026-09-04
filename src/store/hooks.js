import { useDispatch, useSelector } from 'react-redux'

/**
 * 封装 hooks，方便组件统一引用
 * （上 TypeScript 后可在这里补类型）
 */
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
