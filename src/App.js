import React, { useState } from 'react';
import './styles.css';

function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);

  const flipCard = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    if (clickedCard.solved || clickedCard.flipped) {
      return;
    } else {
      clickedCard.flipped = true;
      checkPairs();
    }

    setCards([...cards]);
  };

  const checkPairs = () => {
    const flippedCards = cards.filter((cards) => cards.flipped && !cards.solved);
    if (flippedCards.length === 1) {
      return;
    } else if (flippedCards[0].value === flippedCards[1].value) {
      setCount(count + 1);
      flippedCards[0].solved = true;
      flippedCards[1].solved = true;
      setCards([...cards]);
    } else {
      setCount(count + 1);
      setTimeout(() => {
        flippedCards[0].flipped = false;
        flippedCards[1].flipped = false;
      }, 0);
    }
  }

  const generateRandomValues = () => {
    const emojis = ['👼', '👑', '🐶', '🍎', '💪🏻', '🚀', '💋', '🌈'];
    const values = Array.from({ length: emojis.length }, (_, index) => emojis[index]);
    return [...values, ...values].sort(() => Math.random() - 0.5);
  };

  const createGame = () => {
    const newCards = generateRandomValues().map((value, index) => ({
      id: index + 1,
      value: value,
      flipped: false,
      solved: false
    }));
    setCount(0);
    setCards(newCards);
  };

  return (
    <>
      <h1 className="header">Memory</h1>
      <button onClick={createGame} className="start-game">
        PLAY
      </button>
      <div className="game">
        {cards.map((card) => (
          <div key={card.id} className={`cards ${card.flipped ? 'flipped' : ''} ${card.solved ? 'solved' : ''}`}>
            <button onClick={() => flipCard(card.id)}>
              {card.flipped ? card.value : ' '}
            </button>
          </div>
        ))}
      </div>
      <p>attempts: {count}</p>
    </>
  );
}

export default App;

/*
<div id='1' className='cards'>
          <button onClick={openCard} id='1'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='2' className='cards'>
          <button onClick={openCard} id='2'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='3' className='cards'>
          <button onClick={openCard} id='3'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='4' className='cards'>
          <button onClick={openCard} id='4'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='5' className='cards'>
          <button onClick={openCard} id='5'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='6' className='cards'>
          <button onClick={openCard} id='6'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='7' className='cards'>
          <button onClick={openCard} id='7'>{card.flipped ? card.value : ' '}</button>
        </div>
        <div id='8' className='cards'>
          <button onClick={openCard} id='8'>{card.flipped ? card.value : ' '}</button>
        </div>
*/