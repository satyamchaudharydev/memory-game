import "./App.css";
import React, { useState, useEffect } from "react";
import data from "./data";

function App() {
  const [clickedCard, setclickedCard] = useState([]);
  const [opendCard, setOpendCard] = useState([]);

  const [toggle, setToggle] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const funcSetToggle = (index) => {
    setToggle(toggle.map((item, i) => (i === index ? !item : item)));
  };

  const randmize = () => {
    const cardData = data();
    return cardData
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
      }));
  };
  const [cards, setCards] = useState(randmize());

  return (
    <>
      <section className="game-container">
        {cards.map((card, index) => {
          return (
            <SingleCard
              index={index}
              card={card}
              toggle={toggle[index]}
              toggleState={toggle}
              setToggle={funcSetToggle}
              ogSetToggle={setToggle}
              clickedCard={clickedCard}
              opendCard={opendCard}
              setOpendCard={setOpendCard}
              data={data}
              setclickedCard={setclickedCard}
            />
          );
        })}
      </section>
    </>
  );
}
const SingleCard = ({
  index,
  card,
  clickedCard,
  setclickedCard,
  toggle,
  setToggle,
  toggleState,
  ogSetToggle,
  opendCard,
  setOpendCard,
  data,
}) => {
  const [block, setBlock] = useState(false);
  return (
    <>
      <div
        className={`card ${toggle && "toggleCard"} ${block && "block"}`}
        name={card.name}
        onClick={(e) => {
          const isCard = opendCard.find((item) => item.id === card.id);
          if (isCard) return;
          if (clickedCard.length >= 2) return;

          setToggle(index);

          opendCard.push(card);
          console.log(opendCard);
          clickedCard.push(card);

          if (clickedCard.length === 2) {
            if (clickedCard[0].name === clickedCard[1].name) {
              // const isCard = opendCard.find((item) => item.id === card.id);
              // if (isCard) return;
              setclickedCard([]);
            } else {
              setTimeout(() => {
                ogSetToggle(
                  toggleState.map((item, i) =>
                    clickedCard.map((card) => card.id).includes(i) ? true : true
                  )
                );
                setclickedCard([]);
              }, 500);
            }
          }
        }}
      >
        <div className="back"></div>
        <div className="face">{card.text}</div>
      </div>
    </>
  );
};

export default App;
