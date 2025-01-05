import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DocSite from './pages/DocSite';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs/*" element={<DocSite />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;