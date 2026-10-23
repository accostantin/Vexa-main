export const criarUsuaria = (sobrescrever = {}) => ({
  id: 'u1',
  email: 'maria@x.com',
  created_at: '2026-03-15T12:00:00Z',
  user_metadata: { name: 'Maria' },
  ...sobrescrever,
})

export const criarSessao = (sobrescrever = {}) => ({ user: criarUsuaria(sobrescrever) })
