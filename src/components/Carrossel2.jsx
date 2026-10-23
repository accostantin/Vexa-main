import { useState } from 'react'
import '../Carrossel.css'
import fiveImg from '../assets/5.jpg'
import SixImg from '../assets/6.jpg'
import SevenImg from '../assets/7.jpg'

function Carrossel2() {
  const imagens = [fiveImg, SixImg, SevenImg]

  const [indice, setIndice] = useState(0)

  function proximo() {
    setIndice((indice + 1) % imagens.length)
  }

  function anterior() {
    setIndice((indice - 1 + imagens.length) % imagens.length)
  }

  return (
    <main>
      <div className="Carrossel">
        <button className="botaoesquerda" onClick={anterior}>
          ◀
        </button>
        <img
          src={imagens[indice]}
          alt={`Slide ${indice + 1}`}
          className="imagem"
        />
        <button className="botaodireita" onClick={proximo}>
          ▶
        </button>
      </div>
    </main>
  )
}

export default Carrossel2;