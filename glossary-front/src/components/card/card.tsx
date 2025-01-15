import './card.css';

interface IGlossaryCard {
  word: string;
  definition: string;
}

const GlossaryCard = ({ word, definition }: IGlossaryCard) => {
  return (
    <div className='card'>
      <div className='container'>
        <h2 className='word'>{word}</h2>
      </div>
      <p>{definition}</p>
    </div>
  );
};

export default GlossaryCard;
