import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

export function renderApp(rota = '/') {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <App />
    </MemoryRouter>
  )
}

export function renderRota(ui, rota = '/') {
  return render(<MemoryRouter initialEntries={[rota]}>{ui}</MemoryRouter>)
}
