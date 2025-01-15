import React, { useEffect } from 'react';
import GlossaryCard from '../../components/card/card';

import { fetchTerms } from '../../store/thunk';
import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/store';

// Styles
const cardContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const GlossaryPage = () => {
  const dispatch = useAppDispatch();
  const { terms, loading, error } = useAppSelector((state: RootState) => state.glossary);

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Glossary</h1>
      {
        terms.length !== 0 && (
          <div style={cardContainerStyle}>
          {terms.map((item) => (
              <GlossaryCard
                key={item.keyword}
                word={item.keyword}
                definition={item.definition}
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
