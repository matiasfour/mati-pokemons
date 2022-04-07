import { useState, useEffect } from 'react';
import PokedexItem from '../pokedexItem/PokedexItem';
import './pokedex.css';
import { getPokedexData } from '../../api/pokemon';

const expandPokedex = async (setPokedex, page) => {
  const pageData = await getPokedexData(page);
  setPokedex(prevState => [...prevState, ...pageData]);
}

const Pokedex = () => {
  const [page, setPage] = useState(0);
  const [pokedex, setPokedex] = useState([]);

  useEffect(() => {
    expandPokedex(setPokedex, page);
  }, [page]);

  return (
    <div className='list-wrapper' >  
      <h1>Pokedex (╯°□°)╯︵◓</h1>
      <div className='list'>    
        {
          pokedex.length > 0 ? pokedex.map((pokemon, index) => (
            <PokedexItem key={`${pokemon?.name}-${index}`} pokemon={pokemon} />
          )) : <p>No pokemons loaded</p> 
        }
      </div>
      <button className='load-more' onClick={() => setPage(page+1)}>Load more</button>
    </div>
  )
}

export default Pokedex