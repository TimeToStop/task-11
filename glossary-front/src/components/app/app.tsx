import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import GlossaryPage from '../../page/glossary-page/glossary-page';
import GraphPage from '../../page/graph-page/graph-page';

import './app.css';

function App() {
  return (
    <Router>
      <div>
        <header className='header'>
          <h1 className='header-title'>ITMO PRACTICE</h1>
          <div className='buttons-container'>
            <Link to="/glossary" className='link'>
              <button className='button'>Go to Glossary</button>
            </Link>
            <Link to="/graph" className='link'>
              <button className='button'>Go to Graph</button>
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/graph" element={<GraphPage />} />

          <Route path="*" element={<Navigate to="/glossary" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
