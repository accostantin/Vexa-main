import "../assets/css/home.css";
import card1 from "../assets/img/card1.jpg";
import card2 from "../assets/img/card2.jpg";
import card3 from "../assets/img/card3.jpg";

const cards = [
  {
    id: 1,
    image: card1,
    title: "Informar",
    description:
      "Compartilhar informações sobre os diferentes tipos de violência contra a mulher, compreendendo seus direitos.",
  },
  {
    id: 2,
    image: card2,
    title: "Evidenciar",
    description:
      "Dar visibilidade à realidade da violência contra a mulher, mostrando a dimensão do problema na sociedade.",
  },
  {
    id: 3,
    image: card3,
    title: "Conscientizar",
    description:
      "Estimular a reflexão e o enfrentamento da violência contra a mulher, incentivando a prevenção, o respeito e a busca por ajuda.",
  },
];

export default function Home() {
  return (
    <div className="container">
    {" "}
      <div className="home">
                <p className="subtitle"></p>       {" "}
        <h1 className="Home-title">        Nossa Proposta         </h1>       {" "}
        <p className="description">        </p>     {" "}
      </div>
           {" "}
      <div className="cards">
      {" "}
        {cards.map((item) => (
          <div className="card" key={item.id}>
                       {" "}
            <img src={item.image} alt={item.title} className="card-image" />   
                   {" "}
            <div className="card-content">
                            <h2 className="titulo-card">{item.title}</h2>       
                    <p>{item.description}</p>           {" "}
            </div>
                     {" "}
          </div>
        ))}
             {" "}
      </div>
         {" "}
    </div>
  );
}
