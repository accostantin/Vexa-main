function Selo({ children, tipo = 'neutro' }) {
  return <span className={`selo ${tipo}`}>{children}</span>
}

export default Selo