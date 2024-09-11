// import "./App.css";
// import CharacterList from "./pages/CharacterList";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import "./index.css";
import CharacterDetail from "./pages/CharacterDetails";
import { CharacterProvider } from "./context/CharacterContex";
import CharactersByLocation from "./pages/CharacterByLocations";

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/locations" element={<CharactersByLocation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CharacterProvider>
  );
}

export default App;
