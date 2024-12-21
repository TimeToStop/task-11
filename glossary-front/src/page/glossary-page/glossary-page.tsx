import React, { useState, useEffect } from 'react';
import GlossaryCard from '../../components/card/card';

import { fetchTerms, addTerm, deleteTerm } from '../../store/thunk';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Styles
const inputStyle: React.CSSProperties  = {
  margin: '5px',
  padding: '10px',
  fontSize: '16px',
  width: '200px',
};

const buttonStyle: React.CSSProperties  = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
};

const cardContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const GlossaryPage = () => {
  const [isWordValid, setWordValid] = useState(false);
  const [word, setWord] = useState("");
  const [isDefinitionValid, setDefinitionValid] = useState(false);
  const [definition, setDefinition] = useState("");
  const dispatch = useAppDispatch();
  const { terms, loading, error } = useAppSelector((state: RootState) => state.glossary);

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  const validateWord = (word: string) => {
    const found = terms.findIndex((term) => term.keyword === word) > -1;
    setWordValid(word?.length > 0 && !found);
    setWord(word);
  }

  const validateDefinition = (definition: string) => {
    setDefinitionValid(definition?.length > 0);
    setDefinition(definition);
  }

  const handleAddCard = () => {
    dispatch(addTerm({ keyword: word, definition }));
    setWord("");
    setDefinition("");
  };

  const handleDeleteCard = (wordToDelete: string) => {
    dispatch(deleteTerm(wordToDelete));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Glossary</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter word/phrase"
          value={word}
          onChange={(e) => validateWord(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Enter definition"
          value={definition}
          onChange={(e) => validateDefinition(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAddCard} style={buttonStyle} disabled={!(isWordValid && isDefinitionValid)}>
          Add
        </button>
      </div>
      {
        terms.length !== 0 && (
          <div style={cardContainerStyle}>
          {terms.map((item) => (
              <GlossaryCard
                key={item.keyword}
                word={item.keyword}
                definition={item.definition}
                deleteCard={handleDeleteCard}
              />
            ))}
          </div>
        )
      }
      {
        terms.length === 0 && (
          <div style={cardContainerStyle}>
            No card was added!
          </div>
        )
      }
    </div>
  );
};

export default GlossaryPage;
