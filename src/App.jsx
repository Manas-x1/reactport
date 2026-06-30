import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MetroidDetail from './pages/MetroidDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metroid" element={<MetroidDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
