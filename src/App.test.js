import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

/**
 * 冒烟测试：首页能渲染知识目录
 */
test('renders knowledge catalog home', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { name: /React 入门学习/i })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /认识 React/i })).toBeInTheDocument()
  expect(screen.getByText(/React 是什么？/i)).toBeInTheDocument()
})
