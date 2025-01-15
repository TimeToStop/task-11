fetch('http://localhost:8100/update-glossary', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    glossaryUrl: 'https://raw.githubusercontent.com/Lenika2000/glossary/refs/heads/master/glossary-server/data/default/glossary.json' 
  }),
})
  .then((response) => response.text())
  .then((data) => console.log(data));

  