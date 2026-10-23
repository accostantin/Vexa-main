import { Link } from 'react-router-dom'

function Button() {
  return (
    <div className="btn">
      <Link to="/entrar" className="btn-ladob" target="_self" rel="noopener noreferrer">
        Lado A
      </Link>
    </div>
  )
}

export default Button;