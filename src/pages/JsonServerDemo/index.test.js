import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import JsonServerDemo from './index'
import http from '../../utils/request'

jest.mock('../../utils/request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}))

function renderPage() {
  return render(
    <MemoryRouter>
      <JsonServerDemo />
    </MemoryRouter>
  )
}

test('falls back to in-memory users when json-server is missing', async () => {
  http.get.mockRejectedValue(new Error('接口返回了网页而不是 JSON'))
  renderPage()

  await waitFor(() => {
    expect(screen.getByText('小明')).toBeInTheDocument()
  })
  expect(screen.getByText(/浏览器内存数据/)).toBeInTheDocument()
  expect(screen.queryByText(/users\.map is not a function/i)).not.toBeInTheDocument()
})

test('renders json-server list when API returns an array', async () => {
  http.get.mockResolvedValue([
    { id: 9, name: '线上接口用户', email: 'api@example.com', role: 'user' },
  ])
  renderPage()

  await waitFor(() => {
    expect(screen.getByText('线上接口用户')).toBeInTheDocument()
  })
  expect(screen.getByText(/已连上 json-server/)).toBeInTheDocument()
})
