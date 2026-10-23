
import { Link } from 'react-router-dom';

function ButtonLadoA() {
  return (
    <div className="btn">
      <Link
        to="/lado-b"
        className="btn-ladob"
        target="_self"
        rel="noopener noreferrer"
      >
        Lado B
      </Link>
    </div>
  );
}

export default ButtonLadoA;

