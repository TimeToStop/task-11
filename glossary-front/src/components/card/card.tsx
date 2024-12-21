import React from 'react';
import './card.css';

interface IGlossaryCard {
  word: string;
  definition: string;
  deleteCard: (id: string) => void;
}

const GlossaryCard = ({ word, definition, deleteCard }: IGlossaryCard) => {
  return (
    <div className='card'>
      <div className='container'>
        <h2 className='word'>{word}</h2>
        <button onClick={() => deleteCard(word)} className='delete-button'>
          Delete
        </button>
      </div>
      <p>{definition}</p>
    </div>
  );
};

export default GlossaryCard;
