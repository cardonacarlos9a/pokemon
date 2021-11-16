import './App.css';
import PokeFullList from './main-views/poke-full-list/poke-full-list';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import usePokemon from './hooks/usePokemon';
import PokeOwned from './main-views/poke-owned/poke-owned';
import { useReducer } from 'react';
import ownedPokemonReducer from './context/ownedPokemonReducer';
import { OwnedPokemonContext } from './context/ownedPokemonContext';

function App() {
  const allPokemon = usePokemon();
  const [capturedPokemon, dispatch] = useReducer(ownedPokemonReducer, [])

  return (
    <OwnedPokemonContext.Provider value={{ capturedPokemon, dispatch }}>
      <Router>
        <div className="">
          <Switch>
            <Route path="/owned">
              <PokeOwned allPokemon={allPokemon}></PokeOwned>
            </Route>
            <Route path="/">
              <PokeFullList allPokemon={allPokemon}></PokeFullList>
            </Route>
          </Switch>
        </div>
      </Router>
    </OwnedPokemonContext.Provider>

  );
}

export default App;
