import React from 'react'
import Pokedex from './components/pokedex/Pokedex';
import PokemonPage from './components/pokemonPage/PokemonPage';
import {
  BrowserRouter as Router,
  Routes, Route,
} from "react-router-dom";

const App = () => {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Pokedex />} />
          <Route exact path="/pokemon/:pokemonId" element={<PokemonPage />} />
        </Routes>
    </Router>
  )
}

export default App
